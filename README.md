# 👗 AI-Based Virtual Try-On System (2D with Hybrid 3D Visualization)

## 📌 Project Description
This project presents an AI-based virtual try-on system that allows users to visualize how clothing would look on them without physically wearing it. The system uses computer vision techniques to detect body pose and align garments onto the user’s image.

The project primarily focuses on a 2D virtual try-on approach and extends it with a hybrid 3D visualization module, which generates multiple views (front, side, and back) to simulate a 3D experience.

---

##  Features
-  User image input
-  Pose estimation using MediaPipe
-  Clothing alignment and overlay
-  AI-based try-on (GAN/VITON concept)
-  Hybrid 3D visualization (multi-view generation)
-  Improved user experience for online shopping

---

##  Tech Stack
- Python
- OpenCV
- MediaPipe
- NumPy
- PIL (Python Imaging Library)
- Matplotlib

---

##  How It Works
1. Input user image and clothing image  
2. Detect body keypoints using pose estimation  
3. Align clothing based on body structure  
4. Overlay clothing onto the user image  
5. Generate output image  
6. Create multi-view outputs (front, side, back) to simulate 3D  

---

##  How to Run
```bash
# Install dependencies
pip install opencv-python mediapipe numpy pillow matplotlib

# Run the project
python main.py
