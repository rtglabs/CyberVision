import pyrealsense2 as rs
import numpy as np
import cv2
import tensorflow as tf
import os

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Configure depth and color streams
pipeline = rs.pipeline()
config = rs.config()
config.enable_stream(rs.stream.color, 1280, 720, rs.format.bgr8, 30)

print("[INFO] Starting streaming...")
pipeline.start(config)
print("[INFO] Camera ready.")

print("[INFO] Loading model...")
PATH_TO_CKPT = "C:/Users/jaggan/realsense/librealsense/wrappers/model/saved_model"

# Load the Tensorflow model into memory.
detect_fn = tf.saved_model.load(PATH_TO_CKPT)

print("[INFO] Model loaded.")
colors_hash = {}
while True:
    frames = pipeline.wait_for_frames()
    color_frame = frames.get_color_frame()

    color_image = np.asanyarray(color_frame.get_data())
    image_expanded = np.expand_dims(color_image, axis=0)

    # Perform the actual detection by running the model with the image as input
    detections = detect_fn(image_expanded)

    boxes = np.squeeze(detections['detection_boxes'].numpy())
    classes = np.squeeze(detections['detection_classes'].numpy()).astype(np.int32)
    scores = np.squeeze(detections['detection_scores'].numpy())

    for idx in range(len(scores)):
        class_ = classes[idx]
        score = scores[idx]
        box = boxes[idx]

        if class_ not in colors_hash:
            colors_hash[class_] = tuple(np.random.choice(range(256), size=3))

        if score > 0.6:
            left = int(box[1] * color_frame.width)
            top = int(box[0] * color_frame.height)
            right = int(box[3] * color_frame.width)
            bottom = int(box[2] * color_frame.height)

            p1 = (left, top)
            p2 = (right, bottom)
            r, g, b = colors_hash[class_]
            cv2.rectangle(color_image, p1, p2, (int(r), int(g), int(b)), 2, 1)

    cv2.namedWindow('RealSense', cv2.WINDOW_AUTOSIZE)
    cv2.imshow('RealSense', color_image)
    cv2.waitKey(1)

print("[INFO] stop streaming ...")
pipeline.stop()
