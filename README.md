# AI-Based Virtual Try-On System (2D with Hybrid 3D Visualization)

### Project Overview

This project presents an AI-powered Virtual Try-On System that allows users to visualize how garments fit on their body using a combination of 2D image processing and 3D hybrid modeling.

The system integrates computer vision, deep learning, and 3D rendering techniques to generate realistic try-on outputs from a single image.

### Key Features

 Virtual garment try-on using user image
 3D human body reconstruction (SMPL model)
 AI-based pose estimation (OpenPose)
 Texture mapping & cloth alignment
 Real-time rendering using WebGL (Three.js)
 Hybrid pipeline (2D warping + 3D modeling)
 Scalable backend using FastAPI
  
 ## Tech Stack
 
### Frontend
React.js (18.2)
Tailwind CSS (3.3)
Redux Toolkit
Three.js (3D rendering)

### Backend
Python 3.11
FastAPI
REST APIs (JSON over HTTP)
AI & Machine Learning
PyTorch 2.0.1
CUDA 11.8
OpenPose (Pose estimation)
VGG-19 (Feature extraction)
3D Modeling & Hybridization
SMPL (3D body model)
PyTorch3D / Open3D
Blender (mesh processing)
MiDaS (depth estimation)
Neural Rendering + UV Mapping
Image Processing
OpenCV
Pillow

### Database
PostgreSQL 15
Deployment
Localhost:8000 (Development)
AWS EC2 (g4dn.xlarge GPU) – Production
System Workflow
User uploads image
Pose estimation using OpenPose
Body model generated using SMPL
Depth estimation applied
Garment features extracted (VGG-19)
2D cloth warping performed
3D hybridization applied (mesh + texture mapping)
Final rendering using Three.js

### Architecture
Frontend (React + Three.js)
        ↓
Backend API (FastAPI)
        ↓
AI Models (PyTorch, OpenPose, SMPL)
        ↓
3D Hybrid Engine (PyTorch3D + Blender)
        ↓
Database (PostgreSQL)

 ### Installation & Setup
 
Clone the Repository
git clone https://github.com/your-username/virtual-tryon.git
cd virtual-tryon

 ### Backend Setup
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend Setup
cd frontend
npm install
npm run dev

### Output Example
Upload user image
Select garment
Get realistic try-on output (2D + 3D hybrid

###  Future Improvements
Mobile app integration
AR-based virtual fitting
Improved cloth physics simulation

###  Author
Yapamanu Chinni Krishna
B.E Computer Science Engineering
Sathyabama University

### Conclusion

This project demonstrates how AI + 3D hybridization can revolutionize online shopping by providing realistic virtual fitting experiences, reducing return rates and improving user satisfaction.


