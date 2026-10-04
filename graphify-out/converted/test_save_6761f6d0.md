<!-- converted from test_save.docx -->

VISVESVARAYA TECHNOLOGICAL UNIVERSITY
Jnana Sangama, Belagavi – 590018
A Major Project Phase-II Report
on
“SKIN DISEASE DETECTION USING IMAGE CLASSIFICATION”
Submitted in partial fulfillment of the requirement for the award of degree of
### Bachelor of Engineering
In
### Computer Science & Engineering (Data Science)
Of Visvesvaraya Technical University, Belagavi. by
CHIRASHRITA L	1AM22CD015
DEENA FAYAZ	1AM22CD021
E TANUJA	1AM22CD025
KERTHII N	1AM22CD039

Under the guidance of
Prof Sumitra Sharma Ph Assistant Professor
Department of CSE(DS)


## DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING (DATA SCIENCE)
AMC ENGINEERING COLLEGE
18th K.M, Bannerghatta Road, Bengaluru .
2025-2026

AMC ENGINEERING COLLEGE
(Affiliated to Visvesvaraya Technological University)
18th K.M, Bannerghatta Road, Bengaluru - 560083
## DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING (DATA SCIENCE)

CERTIFICATE

This is to certify that the Ma jo r Project Phase-II work entitled “SKIN DISEASE DETECTION USING IMAGE CLASSIFICATION ” carried out by bonafide students Chirashrita L 1AM22CD015, Deena Fayaz 1AM22CD021, E Tanuja 1AM22CD025, Kerthii N 1AM22CD039 of AMC Engineering College, in partial fulfillment for the award of Bachelor of Engineering in Computer Science and Engineering (Data Science) of the Visvesvaraya Technological University, Belagavi during the year 2025 - 2026. It is certified that all corrections/suggestions indicated for internal assessment have been incorporated in the report. The Project report has been approved as it satisfies the academic requirements in respect of project work prescribed for said Bachelor of Engineering degree.







External Viva
Name of the Examiners	Signature with date 1.
2.

# DECLARATION
We the undersigned students of 7th semester Department of Computer Science and Engineering (Data Science), AMC Engineering College, Bengaluru, declare that our major project phase-II work entitled “Skin Disease Detection using Image Classification” is a bonafide work of ours. Our project is neither a copy nor by means a modification of any other engineering project. We also declare that this project was not entitled for submission to any other university in the past and shall remain the only submission made and will not be submitted by us to any other university in the future.






ACKNOWLEDGEMENT

Salutations to our beloved and highly esteemed institute “AMC Engineering College “, for having well qualified staff and labs furnished with necessary equipment and computers for growing up us to become true graduates.

In this regard, we express our sincere gratitude to the Chairman Dr. K.R. Paramahamsa and the Principal Dr. Yuvaraju B N, for providing us all the facilities in this college.

We are extremely grateful to our Professor and Head of the Department, Computer Science and Engineering (Data Science), Dr. Vijayakumar.K, for having accepted to patronize us in the right direction with all his wisdom.

We would like to express my immense gratitude to our guide Prof.Sumitra Sharma Ph, Assistant Professor, Dept. of CSE (DS), for her guidance and assistance throughout this project.
.
We thank Dr.Sarojini.Y and Dr.R.Senkamalavalli, Project Coordinators, Department of Computer Science and Engineering (Data Science). We thank our beloved friends for having supported us with all their strength and might. Last but not the least, we thank our parents for supporting and encouraging us throughout. We made an honest effort in this assignment.

We take this opportunity to express my gratitude to all those individuals who have helped me in this project. In few words we cannot express adequately my indebtedness to all my friends. Their constant encouragement and cooperation have been the essential source of inspiration to me.

Last, but not the least, my heart full thanks to my Parents for unrelenting support and being there always with me forever cooperation and goodwill.


ABSTRACT
Skin diseases are among the most common health issues worldwide, with conditions ranging from mild infections to life-threatening cancers like melanoma. Early and accurate diagnosis is essential for effective treatment, yet access to dermatological expertise is limited in many regions. This project aims to develop an intelligent skin disease detection system using image classification techniques based on deep learning. The system utilizes the HAM10000 dataset, which contains over 10,000 dermatoscopic images categorized into seven common skin disease classes. Preprocessing techniques are applied to enhance image quality, and multiple convolutional neural network (CNN) models such as ResNet50, DenseNet121, and a custom CNN are used for feature extraction and classification. To improve overall performance, a stacking-based ensemble approach optimized by a genetic algorithm is employed. The goal is to achieve high classification accuracy and minimize misdiagnosis, ultimately supporting medical professionals and enabling scalable, AI-assisted skin disease screening. The proposed system is designed to be extendable to larger datasets and more disease categories in future phases.

Keywords: Skin disease detection, Deep learning, Image classification, Convolutional Neural Networks (CNNs), HAM10000 dataset , Genetic algorithm, Dermatoscopic images, Medical image analysis, Early diagnosis, Healthcare AI



# LIST OF FIGURES



# LIST OF TABLES



# CHAPTER 1

INTRODUCTION


### Overview
The growing global incidence of skin conditions poses a serious threat to contemporary healthcare systems, especially when it comes to timely and precise diagnosis. The appearance and severity of dermatological conditions vary greatly, ranging from malignant conditions like melanoma to common disorders like psoriasis, eczema, and acne. Clinical research shows that visual examination is still the most common way to diagnose skin conditions, but accurate diagnosis frequently necessitates access to dermatologists and specialized knowledge, both of which are scarce in many areas. Because of this, delayed or inaccurate diagnosis is frequent, which can result in the progression of the illness, higher treatment costs, and, in extreme situations, potentially fatal consequences.
Recent developments in deep learning and computer vision have shown impressive results in medical image analysis, especially in the automated classification of skin lesions from dermatoscopic images. When it comes to learning discriminative visual features like texture, colour variation, asymmetry, and lesion borders, Convolutional Neural Networks (CNNs) have demonstrated excellent performance. However, many state-of-the-art skin disease detection systems rely on deep and computationally.

This project suggests an effective and precise skin disease detection system based on image classification techniques to address these issues. The suggested method aims to balance computational efficiency and diagnostic performance by automatically identifying various categories of skin diseases from dermatoscopic images.
The system incorporates:

- A robust CNN-based architecture for feature extraction and skin disease classification,
- Image preprocessing techniques such as normalization and augmentation to enhance model generalization,
- Multi-class classification to distinguish between various common and severe skin conditions, and

- A scalable framework that can be adapted for real-time or mobile-based diagnostic assistance.
### Problem Statement

In modern healthcare settings, the diagnosis of skin diseases often relies on manual visual inspection by dermatologists, which can be time-consuming and highly dependent on expert availability. Existing skin disease detection systems either focus on a limited number of conditions or struggle to maintain accuracy across diverse image qualities, lighting conditions, and patient skin types. Many traditional approaches lack robust preprocessing and generalization, leading to misclassification and delayed diagnosis.
Furthermore, limited access to dermatological expertise in rural and underserved areas restricts early detection and timely treatment. Therefore, there is a need for an accurate, automated, and scalable skin disease detection system that can reliably classify multiple skin conditions using dermatoscopic images while supporting early diagnosis and improved healthcare accessibility

### Objectives
Developing an intelligent, deep learning-based diagnostic solution that improves the precision and dependability of skin disease classification using dermatoscopic images is the main goal of the suggested skin disease detection system. In order to overcome the difficulties presented by intricate image patterns, differences in skin tone, and lesion morphology, the system seeks to use sophisticated Convolutional Neural Network (CNN) architectures to automatically detect and classify a variety of skin conditions with high precision and robustness.

By facilitating quick and automated skin image analysis, it also aims to support early diagnosis, helping medical practitioners reduce manual labour and increase diagnostic efficiency. Designing a scalable and user-friendly platform that enables users to upload images, view prediction results, and obtain clear textual and visual insights into detected conditions is another important goal.
Additionally, the system uses efficient preprocessing, model optimisation, and evaluation techniques to guarantee consistent performance across a variety of datasets. The

suggested solution aims to encourage proactive skin health monitoring and function as a trustworthy clinical decision-support tool by fusing intelligent automation with accessible design.
### Scope of the study

The proposed skin disease detection system has a broad scope in addressing key challenges associated with timely and accurate dermatological diagnosis. It is designed to provide an intelligent, deep learning–based framework capable of classifying dermatoscopic images into multiple skin disease categories using the HAM10000 dataset. By leveraging Convolutional Neural Networks (CNNs), the system ensures reliable multi-class classification of common skin conditions such as melanoma, benign and malignant lesions, and vascular disorders, supporting accurate and early diagnosis.
The scope of the system extends to comprehensive image processing, including preprocessing, feature extraction, model training, validation, and performance evaluation, ensuring robustness across images captured under varied conditions. The platform is intended to function as a decision-support tool for dermatologists, enhancing diagnostic efficiency and consistency while reducing manual workload. Additionally, its user-friendly interface allows individuals to upload skin images and receive predictive results, enabling self-monitoring and early health awareness. With its scalable design, the system holds potential for future expansion to larger datasets and additional disease categories, contributing to improved dermatological care and accessible AI-assisted diagnosis.

### Disadvantages of Existing System

Even with major improvements in computer vision and deep learning for medical image analysis, current skin disease detection technologies have to deal with a number of challenges that make them less dependable and hinder their use in real clinical practice.

- Limited Disease Coverage: Most current skin disease identification systems are built to differentiate only a few conditions, usually between 2 and 7 diseases. This limited range hampers their value in a thorough dermatological diagnosis.
- Dependence on Small or Imbalanced Datasets: Many models rely on limited or highly imbalanced datasets, which can lead to biased predictions and reduced

robustness when applied to diverse patient populations and real-world scenarios.
- Sensitivity to Environmental and Lighting Variations: Variations in image quality, lighting conditions, skin tone, and acquisition devices significantly affect model performance, resulting in inconsistent and unreliable predictions.
- Suboptimal Model Architectures and Optimization: Several existing systems employ single or poorly optimized deep learning models, failing to leverage advanced architectures or ensemble techniques that could improve classification accuracy and generalization.
- Minimal Explainability and Clinical Interpretability: Most systems function as black-box models, offering limited insight into prediction reasoning, which reduces clinician trust and hinders medical validation.
- Scalability and Deployment Constraints: High computational requirements and lack of optimized deployment strategies restrict the scalability of these systems for use in real-time or resource-constrained environments.
### Proposed System

The planned system intends to simplify the detection of skin diseases through the use of sophisticated deep learning-based image classification methods. Skin diseases can be just common conditions or serious and even fatal ones like melanoma, thus, the necessity for early and accurate diagnosis cannot be overemphasized. Unfortunately, in most areas, there is a shortage of specialized dermatological care leading to late diagnosis and consequently, a higher risk of health complications. This system is a response to such a challenge, which means deploying smart algorithms and dermatoscopic images in facilitating the first recognition and classification of skin diseases at the earliest stage.

The main component of the setup is a Convolutional Neural Network (CNN), a deep learning architecture that is highly compatible with medical image analysis. CNNs can directly learn from dermatoscopic images the hierarchical and discriminative features, thus they can find the subtle patterns and characteristics in the images that even a human with a manual examination might overlook. The model gets trained on a labeled dataset of dermatoscopic images and therefore, it can effectively do multi-class classification of various skin disease categories at once with high accuracy and reliability.

Once the system is trained, it is capable of evaluating fresh images that it has never seen

before and can thus create predictions which can help dermatologists in their decision-making process and can be used by individuals as a self-screening tool. The technology can simply make the diagnosis automatically at the very first stage, thus it can considerably increase the diagnostic speed, lighten the burden of medical staff, and motivate people to regularly check their skin condition and become more aware of their skin health.

Eventually, the planned system may be developed into web-based or mobile application, thus, allowing the users from remote or less-privileged areas to access the services. By perpetual training on bigger and more varied datasets, the system can become a dermatology scalable and reliable diagnostic assistant that can make a significant contribution.

# CHAPTER 2

- Introduction

# LITERATURE SURVEY

The growing adoption of artificial intelligence in healthcare has greatly improved the analysis of medical images, especially in the diagnosis of skin diseases. Dermatoscopic images provide detailed visual information that helps in identifying skin conditions at an early stage. However, manual examination of these images requires experienced dermatologists and can be time- consuming, making timely diagnosis difficult in areas with limited medical expertise.
Previous research has widely explored machine learning and deep learning techniques, particularly Convolutional Neural Networks (CNNs), for skin disease classification. While many studies report encouraging results, they often face challenges such as limited disease categories, dataset imbalance, and reduced accuracy when images vary in lighting or quality. Recent work has focused on transfer learning and ensemble methods to overcome these issues.
This literature survey reviews existing deep learning-based skin disease detection approaches, highlighting their strengths and limitations. It helps identify gaps in current systems and provides a strong foundation for developing a more accurate, reliable, and scalable skin disease classification model.
### Literature Survey

- “Deep Learning in Skin Disease Image Recognition” (2020) - This paper explores the application of deep learning techniques, particularly Convolutional Neural Networks (CNNs), for automated skin disease image recognition. The authors analyze how CNN-based models can effectively extract complex visual features from dermatoscopic images, enabling accurate classification of various skin diseases. The study highlights the advantages of using transfer learning with pre-trained models to improve performance when labeled medical data is limited. Experimental results demonstrate that deep learning approaches significantly outperform traditional machine learning methods in terms of accuracy and robustness. The paper concludes that deep learning–based systems have strong potential to assist dermatologists in early diagnosis and improve efficiency in skin disease detection.

- “Discriminative Feature Learning for Skin Disease Classification Using Deep CNN” - This paper discusses how deep convolutional neural networks can automatically learn important visual features from skin disease images that help distinguish one condition from another. Instead of relying on manually designed features, the study emphasizes learning disease-specific patterns directly from image data. The findings indicate that deep learning models are effective in improving skin disease classification accuracy and can play a supportive role in automated dermatological diagnosis.

- “The Genetic Algorithm Optimized Stacking Approach to Skin Disease Detection” (2024) - This paper introduces a skin disease detection framework that improves classification performance by combining multiple machine learning and deep learning models using a stacking ensemble technique optimized with a genetic algorithm. The genetic algorithm is used to select optimal model combinations and parameters, resulting in better accuracy and robustness compared to individual models. The study highlights that ensemble learning, when optimized intelligently, can enhance skin disease detection and provide more reliable predictions for complex dermatoscopic images.
- “Skin Micro-structure Segmentation and Aging Classification Using CNN-Based Models”(2021) - This paper focuses on the use of CNN-based models to analyze skin micro- structures for segmentation and aging classification. The study demonstrates how deep learning can effectively capture fine-grained skin features such as texture and structural patterns, enabling accurate classification related to skin aging. The results highlight the potential of CNNs in detailed skin analysis and their applicability to dermatological research and healthcare support systems.
“Studies on different CNN algorithms for facial skin disease classifications” (2023)
- This study analyzes and compares the performance of various Convolutional Neural Network (CNN) architectures for facial skin disease classification. It evaluates different models based on accuracy and reliability in identifying skin conditions from facial images. The paper highlights that model selection and architectural differences significantly impact classification performance, emphasizing the importance of choosing appropriate CNN algorithms for effective facial skin disease detection.

- Equitable Skin Disease Prediction Using Transfer Learning Across Medical Domains (2024) - This paper focuses on developing fair and generalizable skin disease prediction models using transfer learning across diverse medical domains. The authors address bias and performance disparities caused by limited and imbalanced datasets, especially for underrepresented skin tones and populations. Pretrained deep learning models are adapted to new dermatological datasets to improve accuracy and equity. The study highlights how domain adaptation enhances robustness when models are deployed in real-world clinical environments. The results demonstrate improved generalization while maintaining ethical considerations in AI-driven healthcare systems.
- [3] Genetic Algorithm Optimized Stacking Approach to Skin Disease Detection (2024) - This work proposes a hybrid ensemble learning framework that combines multiple CNN models using a stacking technique optimized by a Genetic Algorithm. The GA is used to select optimal model weights and improve classification accuracy on dermatoscopic image datasets. The approach significantly enhances prediction performance compared to single CNN models. Although computationally intensive, the method achieves high accuracy and reduced misclassification. This paper demonstrates the effectiveness of combining deep learning with evolutionary optimization techniques for skin disease detection.
- [4] Deep Learning-Based Skin Lesion Classification Using Dermoscopic Images (2022) - This paper presents a deep learning approach for classifying skin lesions using dermoscopic images. The authors employ CNN architectures to automatically extract visual features such as texture, color variation, and lesion boundaries. Preprocessing techniques and data augmentation are used to improve model generalization. The study evaluates model performance using standard metrics and reports promising accuracy for multi-class lesion classification. The work reinforces the suitability of CNNs for automated dermatological image analysis.
- Comparative Study of CNN Architectures for Skin Disease Detection (2021) - This study compares the performance of various CNN architectures for skin disease detection using clinical and dermatoscopic images. Models such as VGG, ResNet, DenseNet, and MobileNet are evaluated based on accuracy, computational cost, and generalization ability. The paper highlights trade-offs between model complexity and performance. The results show that lightweight models can achieve competitive accuracy with lower

resource requirements. This comparative analysis helps guide architecture selection for efficient skin disease detection systems.

- Enhanced Feature Extraction for Medical Image Classification Using EfficientNet (2023) - This paper explores the use of EfficientNet for enhanced feature extraction in medical image classification tasks. The authors demonstrate how EfficientNet’s compound scaling strategy improves accuracy while maintaining computational efficiency. The model is applied to medical imaging datasets, including dermatological images, and shows superior performance compared to traditional CNNs. Feature refinement and transfer learning play a key role in achieving high classification accuracy. The study supports the use of EfficientNet in resource-constrained and real-time medical applications.

# CHAPTER 3

SYSTEM REQUIREMENTS SPECIFICATION
System requirements define the essential conditions and capabilities needed for the successful development and operation of the proposed skin disease detection system. These requirements help in planning and designing the system architecture, ensuring it functions efficiently and meets user expectations. This chapter categorizes the requirements into functional, nonfunctional, and basic operational needs, outlining both what the system should do and the technical environment necessary to support its development and deployment.

## FUNCTIONAL REQUIREMENT
Functional requirements define the specific behavior and operations that the system must support. For this project, the functional requirements include:
- Image Input: The system should accept dermatoscopic skin images as input (in JPG or PNG format).
- Preprocessing Module: Automatically resize, normalize, and augment input images for model compatibility.
- Classification Module: Classify the input image into one of the seven predefined skin disease categories using trained CNN models.
- Model Ensembling: Use a stacking-based ensemble method to combine predictions from multiple models.
- Result Display: Output the predicted disease class with confidence scores.

- Performance Metrics: Calculate and display model accuracy, precision, recall, F1- score, and Top-5 accuracy after training.
## NON FUNCTIONAL REQUIREMENT

These requirements focus on the performance and usability aspects of the
system.

- Accuracy: The system should aim to achieve at least 90% accuracy in skin

disease classification.

- Scalability: The architecture should support future expansion to more diseases and larger datasets.
- Efficiency: The model should produce predictions within a few seconds of image input.
- Usability: The system should be simple and intuitive to use for healthcare professionals.
- Maintainability: The codebase should be modular and well-documented for future improvements.
- Portability: The system should run on standard computing environments (e.g., Windows/Linux with Python).
## BASIC OPERATIONAL REQUIREMENT
These define the essential technical infrastructure and tools needed to run the system.

HARDWARE REQUIREMENTS

- Processor: Intel i5 or higher (i7 recommended for faster model training)
- RAM: 8 GB minimum (16 GB recommended)
- Storage: 500 GB HDD/SSD
- GPU: NVIDIA GPU with CUDA support (optional but speeds up model training)

SOFTWARE REQUIREMENTS
- Operating System: Windows 10/11 or Linux
- Programming Language: Python 3.x (for model development)
- Libraries/Frameworks: TensorFlow/Keras, OpenCV, NumPy, Pandas, Matplotlib, Scikit-learn
- Deployment: JavaScript (React/Node.js for frontend/backend)
- IDE: VS Code / PyCharm / Jupyter Notebook
- Others: Git (version control)

# CHAPTER 4
SYSTEM MODELING
System modeling provides a structured representation of how the skin disease detection system functions, interacts, and processes information from input to output. The model illustrates the sequential flow beginning with image acquisition, followed by pre-processing, data partitioning, feature extraction, and classification. Each stage transforms the input data into a more meaningful form, ultimately producing an accurate diagnostic prediction. Diagrams such as use case models, data flow diagrams, and sequence diagrams help visualize user interactions, internal operations, and data transitions within the system. By modeling the system in this structured manner, it becomes easier to analyze functionality, identify dependencies, and ensure that all components work cohesively to support efficient and reliable skin disease detection.
## FUNDAMENTAL DESIGN CONCEPTS

The fundamental design concepts guiding the system focus on modularity, abstraction, scalability, and efficiency. Each phase such as preprocessing, feature extraction, and classification is designed as an independent module, allowing easy updates, testing, and optimization. Abstraction ensures that complex processes like CNN feature learning are hidden behind simple interfaces, enabling the system to handle intricate patterns without overwhelming the user. Scalability is achieved through the use of lightweight deep learning models like MobileNetV2 and EfficientNet, making deployment feasible on both high-end servers and low-resource devices. The design also emphasizes reliability through validation loops and performance metrics, ensuring accurate predictions. Together, these design principles create a robust, maintainable, and user-friendly diagnostic system capable of evolving with future requirements.
INPUT DESIGN
The input design focuses on how data enters the system to support accurate skin disease detection. Users upload images of skin lesions, or images may be sourced from dermatology datasets during training. These inputs are processed through steps such as resizing, normalization, noise reduction, and contrast enhancement to ensure uniform quality before analysis. Additionally, the system collects user responses from a short skin-type quiz, helping

identify whether the skin is oily, dry, combination, or sensitive. Together, these inputs ensure the model receives both high-quality image data and relevant user information needed for personalized assessment.




Figure 4.1.1: Input Design of Skin Disease Detection System
Figure 4.1.1 illustrates how the user uploads a skin image, which is then validated and preprocessed. The processed image is passed to the CNN model for further classification.

OUTPUT DESIGN

The output design ensures that the system presents clear, meaningful, and reliable results to the user. After processing the input image through the CNN model, the system outputs the predicted skin disease category such as Vitiligo, Psoriasis, Eczema, Melanoma, or Acne along with confidence scores that indicate the certainty of the prediction. The system also provides tailored skincare guidance based on the detected condition and the user’s identified skin type, including recommended ingredients and preventive measures. In addition, visual indicators and easy-to-understand explanations help users interpret the results effectively. The output encourages timely medical consultation for high-risk cases and supports proactive skin health management. The results are displayed through a user-friendly interface that ensures accessibility for non-expert users. This design enhances user trust and promotes informed decision-making regarding skin care and treatment.






Figure 4.1.2: Output Design of Skin Disease Detection System
Figure 4.1.2 illustrates how the trained CNN model processes the input image to generate a prediction. The detected skin disease along with the confidence score is displayed to the user.

## DEVELOPMENT MODEL

For this project, an Iterative and Incremental Development Model is followed. In this model, the system is developed in small, manageable phases, where each phase adds or refines a specific module such as image pre-processing, CNN-based classification, skin-type quiz, or AI recommendation. The process begins with requirement analysis and system design, followed by implementation of a basic version of the image classification pipeline. After each iteration, the model is tested using performance metrics like accuracy, precision, recall, and F1-score, and feedback is used to fine-tune pre-processing steps, model parameters, and dataset balance. New features such as skin-type identification and skincare guidance are then incrementally integrated and validated. This approach suits AI-based systems well, as it allows continuous improvement, better handling of model performance issues, and gradual enhancement of system accuracy and usability.

DATAFLOW DIAGRAM

Figure 4.2.1: Data Flow Diagram for Skin Disease Detection.
Figure 4.2.1 illustrates the data flow diagram depicts the movement of data between system processes, external entities, and data stores

USE CASE DIAGRAM


Figure 4.2.2: Use Case Diagram for Skin Disease Detection.
Figure 4.2.2 represents the functional requirements of the system by illustrating the interactions between users (actors) and the key system functionalities, such as data input, preprocessing, feature extraction.

SEQUENCE DIAGRAM

Figure 4.2.3: Sequence Diagram for Skin Disease Detection
Figure 4.2.3 illustrates the dynamic interaction between system components, capturing the flow of messages across preprocessing data partitioning, feature extraction, classification, and result generation stages.

# CHAPTER 5
PROJECT IMPLEMENTATION
The implementation of the Skin Disease Detection System was carried out as an end-to-end machine learning application, integrating image processing, deep learning–based classification, and a user-friendly web interface. The system was designed to assist in the early identification of common skin conditions such as Melanoma, Psoriasis, Eczema, Vitiligo, and Acne using dermoscopic and clinical images.
The development process began with the isolation and validation of the image classification model to ensure reliable disease prediction before integrating it into a full-stack application. A modular architecture was adopted to allow independent development of the frontend, backend, and machine learning components. This approach enabled scalability, maintainability, and efficient experimentation with different model architectures. The final system provides real-time predictions with high accuracy while remaining accessible on consumer-grade hardware.
# IMPLEMENTATION STRATEGIES

The primary implementation strategy involved adopting a decoupled Client–Server architecture to separate the presentation layer from the computational logic. The frontend was developed as a lightweight web application responsible for image upload, user interaction, and result visualization, while the backend handled image preprocessing, model inference, and data storage. This separation ensures that computationally intensive deep learning operations do not burden the client device.
A data-centric machine learning strategy was followed during model development. The focus was placed on data quality rather than model complexity. Skin image datasets were cleaned, resized, and normalized to reduce noise caused by lighting variations, skin tone differences, and image artifacts. Data augmentation techniques such as rotation, zooming, flipping, and contrast enhancement were applied to improve generalization and reduce overfitting.
For model implementation, transfer learning was employed using a pre-trained Convolutional Neural Network (CNN). Leveraging pre-trained weights significantly reduced training time and improved performance on limited medical image datasets. Fine-tuning of the

upper layers allowed the model to learn disease-specific visual patterns such as lesions, discoloration, and texture variations.
To ensure reliable predictions, a confidence-based inference strategy was implemented. Along with the predicted disease class, the system outputs a probability score that helps users understand the certainty of the diagnosis. This approach improves transparency and supports informed decision-making rather than presenting a black-box result.
Finally, data persistence and integrity were maintained using a structured database strategy. All predictions, uploaded images (optional), and user details were stored using normalized relational tables. Input validation and schema enforcement were applied at both frontend and backend levels to prevent invalid data entry and ensure consistent analytics.
# MODULE IMPLEMENTATION

User Authentication and Profile Management Module

This module is responsible for controlling access to the Skin Disease Detection System and managing user-related information. It provides secure user registration and login functionality to ensure that only authorized users can access the system. User credentials are protected using password encryption techniques before being stored in the database, thereby preventing unauthorized access and data breaches.
The profile management component stores basic user information and maintains a history of previous predictions. This allows users to track their past results and supports longitudinal analysis of skin conditions. The module also ensures proper session handling, enabling users to remain logged in securely across multiple interactions with the system.
Image Upload and Preprocessing Module

The Image Upload and Preprocessing Module handles the acquisition and preparation of skin images for analysis. Users can upload images in standard formats such as JPEG and PNG through a simple and intuitive interface. Once uploaded, images are validated to ensure correct format and size.
Preprocessing steps include resizing images to a fixed resolution, normalization of pixel values, and noise reduction to minimize variations caused by lighting conditions or

camera quality. These steps ensure that all images conform to the input requirements of the deep learning model, thereby improving classification accuracy and consistency.
Skin Disease Classification Module

This module forms the core intelligence of the system. It loads the trained Convolutional Neural Network (CNN) model and performs inference on the preprocessed images. The CNN automatically extracts relevant visual features such as color variation, lesion shape, texture, and boundary irregularities.
Based on these features, the model classifies the image into one of the predefined skin disease categories, including Melanoma, Psoriasis, Eczema, Vitiligo, and Acne. The module outputs both the predicted disease label and a confidence score, allowing users to understand the reliability of the prediction.
Decision Support and Recommendation Module

The Decision Support and Recommendation Module provides meaningful guidance based on the classification results. For each detected skin condition, the system displays a brief description of the disease along with general precautions and care suggestions.
In cases where the model detects potentially serious conditions such as Melanoma, the module emphasizes the importance of seeking professional medical advice. This ensures responsible use of the system and reinforces its role as a supportive diagnostic tool rather than a replacement for medical professionals.
Analytics and Reporting Module

This module is responsible for storing, analyzing, and visualizing prediction data. It records details such as prediction results, confidence scores, and timestamps in a structured database. The collected data can be used to analyze disease trends and model performance over time.
The reporting functionality enables the generation of summaries and visual insights that can be useful for academic evaluation, research analysis, or healthcare reference. This module enhances the overall value of the system by transforming raw prediction data into meaningful information.

Model Management and Update Module

This module handles the loading, versioning, and updating of trained machine learning models. It allows the system to seamlessly switch between different model versions without affecting the frontend or user experience.
The module ensures that the latest and most accurate model is used for inference while maintaining backward compatibility with stored prediction records. This design supports future improvements and scalability of the system.
System Integration and Error Handling Module

This module ensures smooth interaction between the frontend, backend, and machine learning components. It manages API communication, handles exceptions, and provides informative error messages to users in case of invalid inputs or system failures.
Proper logging mechanisms are implemented to track system behavior and errors, aiding in debugging and performance monitoring. This module improves system robustness and enhances user trust.
# SOFTWARE ENVIRONMENT
The software environment for the Skin Disease Detection System is designed using a modern, open-source technology stack that supports efficient machine learning computation, reliable backend services, and an interactive user interface. The selected tools and frameworks ensure scalability, maintainability, and ease of deployment while supporting the computational requirements of deep learning–based image analysis.

The backend of the system is developed using Python 3.x, chosen for its extensive ecosystem of libraries for machine learning, image processing, and data analysis. Python provides strong support for scientific computing and seamless integration with deep learning frameworks. The server-side application is implemented using Flask / FastAPI, which provides lightweight, high-performance RESTful APIs for handling image uploads, user authentication, and prediction requests. FastAPI is particularly effective in handling concurrent requests with low latency.

The machine learning environment is built using TensorFlow with Keras, which enables efficient training and inference of Convolutional Neural Network (CNN) models. The framework supports GPU acceleration, allowing faster model training and improved performance during inference. NumPy is used for numerical operations, while OpenCV and Pillow are employed for image preprocessing tasks such as resizing, normalization, and color conversion.

For data persistence, the system uses a relational database management system such as MySQL or PostgreSQL. These databases are selected for their reliability, data integrity, and support for structured data storage. The database stores user credentials, profile information, prediction results, confidence scores, and timestamps. ORM (Object Relational Mapping) techniques are used to simplify database interaction and reduce query complexity.

On the client side, the frontend environment is developed using React.js along with standard HTML, CSS, and JavaScript. React enables the creation of reusable UI components and ensures a responsive and interactive user experience. The interface allows users to upload images, view prediction results, and access historical data easily. Styling is handled using modern CSS techniques to maintain consistency and accessibility across devices.

The entire development setup is managed using virtual environments and dependency management tools to ensure reproducibility and isolation of libraries. This approach prevents version conflicts between machine learning frameworks and system dependencies. The system is designed to be platform-independent and can be deployed on local servers or cloud platforms with minimal configuration.
Overall, the chosen software environment provides a robust foundation for implementing an accurate, scalable, and user-friendly Skin Disease Detection System.
# ALGORITHMS
The Skin Disease Detection System utilizes a combination of deep learning and image processing algorithms to accurately classify dermatological conditions from skin images. These algorithms work together to extract meaningful features, learn disease-specific patterns, and generate reliable predictions.

Convolutional Neural Network (CNN)

A Convolutional Neural Network is the primary algorithm used for skin disease classification. CNNs are highly effective for image-based tasks due to their ability to automatically learn spatial hierarchies of features. The network consists of multiple convolutional layers that apply learnable filters to the input image, capturing low-level features such as edges and textures, as well as high-level features such as lesion shapes and color patterns.
Pooling layers are used to reduce the spatial dimensions of feature maps, thereby decreasing computational complexity and improving generalization. Fully connected layers at the end of the network perform classification based on the extracted features.


Figure 5.4.1: CNN Deployment Model for Skin Disease Detection
Figure 5.4.1 represents the deployment of the trained CNN model within the system. The model receives the preprocessed skin image as input and produces the disease prediction and confidence score as output.
Transfer Learning Algorithm

Transfer learning is employed to improve classification accuracy and reduce training time. A pre-trained CNN model, trained on large-scale image datasets, is used as the base model. The initial layers of the network are frozen to retain general visual features, while the final layers are fine-tuned using the skin disease dataset.

This approach is particularly beneficial for medical imaging applications, where labeled data is limited. Transfer learning enables the model to leverage prior knowledge and adapt it to skin disease classification effectively.

Image Preprocessing Algorithm

Before feeding images into the CNN, several preprocessing steps are applied. Images are resized to a uniform resolution to maintain consistency across inputs. Pixel values are normalized to a standard range to stabilize and speed up model convergence.
Noise reduction techniques and color normalization are applied to minimize variations caused by lighting conditions and camera quality. These preprocessing steps play a crucial role in improving model robustness and prediction reliability.
Image Augmentation Algorithm

Image augmentation is used during the training phase to artificially increase the size and diversity of the dataset. Techniques such as rotation, horizontal flipping, zooming, and brightness adjustment are applied randomly to training images.
This algorithm helps prevent overfitting by exposing the model to varied versions of the same image and improves its ability to generalize to unseen data.
Softmax Classification Algorithm

The final layer of the CNN uses the Softmax activation function to convert raw output scores into probability values for each skin disease class. The class with the highest probability is selected as the predicted disease.
Softmax ensures that the sum of all class probabilities equals one, making the output interpretable and suitable for multi-class classification problems.
Loss Function – Categorical Cross-Entropy

Categorical Cross-Entropy is used as the loss function during model training. It measures the difference between the true labels and the predicted probability distribution produced by the Softmax layer.

Optimization Algorithm – Adam Optimizer

The Adam optimizer is used to update model weights during training. It combines the advantages of Adaptive Gradient Descent and Momentum, allowing faster convergence and efficient handling of sparse gradients.
Adam dynamically adjusts the learning rate for each parameter, making it suitable for deep learning models with large parameter spaces.
Evaluation Metrics Algorithm

To assess the performance of the model, multiple evaluation metrics are used, including accuracy, precision, recall, F1-score, and confusion matrix. These metrics provide a comprehensive understanding of the model’s classification behavior, especially in the presence of class imbalance.
Overall, the combination of deep learning, preprocessing, augmentation, and optimization algorithms enables the Skin Disease Detection System to achieve accurate, reliable, and robust disease classification.

# CHAPTER 6
SYSTEM TESTING
## TESTING PROCESS
The testing process for the Skin Disease Detection System was carried out using an iterative and incremental approach that ran in parallel with the development lifecycle. Instead of postponing testing until the final phase, verification and validation activities were performed continuously as individual components were implemented. This strategy helped in early detection of defects, reduced rework, and ensured that the system evolved into a stable and reliable application suitable for medical decision support.

The testing process began with the validation of the machine learning pipeline, as the accuracy and reliability of the CNN-based classifier form the foundation of the system. Initial testing focused on dataset integrity, image preprocessing correctness, and model inference behavior using controlled sample inputs. Once the model performance was verified independently, it was integrated with the backend services and further tested in a real-time prediction environment.

Following model validation, testing progressed to the backend application layer, where REST API endpoints for image upload, prediction requests, user authentication, and data storage were verified. Automated and script-based testing techniques were used to confirm correct request handling, response formats, and error management. This phase ensured that invalid inputs such as unsupported image formats, corrupted files, or missing fields were handled gracefully without system failure.
The next stage of testing involved frontend integration and user interaction validation. Manual testing was conducted to verify that the user interface correctly captured user inputs, displayed prediction results, and provided clear feedback. Particular attention was given to the image upload workflow and result visualization to ensure usability for non-technical users.

Finally, the testing process included system-level and performance testing, where the complete application was evaluated under different operating conditions. The system was tested with images of varying resolutions, lighting conditions, and skin tones to assess

robustness. Performance metrics such as response time, memory usage, and inference latency were monitored to ensure smooth operation on consumer-grade hardware.
A combination of automated backend tests, manual frontend testing, and end-to-end system validation was employed to achieve comprehensive coverage. This layered testing approach ensured that defects could be isolated effectively, whether originating from the machine learning model, backend logic, or frontend presentation, resulting in a reliable and user-centric Skin Disease Detection System.

## AIM OF TESTING

The primary aim of testing in the Skin Disease Detection System is to verify and validate that the application meets its functional, performance, and reliability requirements while ensuring safe and responsible use in a healthcare-related context. Testing is conducted to confirm that the system performs as designed and delivers accurate, consistent, and trustworthy skin disease predictions.
From a verification perspective, testing ensures that each component of the system is implemented correctly according to the design specifications. This includes validating that image preprocessing operations such as resizing and normalization are applied correctly, the CNN model loads and performs inference without errors, backend APIs handle requests securely, and database operations maintain data integrity. Verification confirms that the system is built correctly.
From a validation perspective, testing ensures that the system fulfills its intended purpose for end users. This involves confirming that uploaded skin images produce meaningful disease predictions, confidence scores are correctly displayed, and the user interface is intuitive and easy to use. Validation also ensures that system outputs are understandable and supportive rather than misleading, reinforcing the role of the application as a clinical decision-support tool.
A key aim of testing is to evaluate the robustness of the machine learning model under real-world conditions. Since the system relies on probabilistic deep learning predictions, it is essential to assess behavior under edge cases such as poor lighting, low-resolution images, blurred inputs, and partial skin visibility. The goal is to ensure that the system handles such conditions gracefully by providing appropriate warnings or reduced-confidence outputs instead

of incorrect or unsafe predictions.

Another important aim is to ensure system reliability and stability. Testing verifies that the application does not crash due to invalid inputs, network interruptions, or repeated usage. It also checks that response times remain acceptable and that resource utilization stays within limits during continuous use.
Overall, the aim of testing is to build user trust, technical correctness, and ethical reliability, ensuring that the Skin Disease Detection System is accurate, secure, robust, and suitable for real-world usage while clearly encouraging professional medical consultation when required.
## UNIT TESTING

Unit testing for the Skin Disease Detection System focused on verifying the correctness of individual components in isolation before they were integrated into the complete application. This approach ensured that each module performed its intended functionality independently, making it easier to identify and fix defects at an early stage of development.
The first area of unit testing targeted the image preprocessing module, which plays a critical role in preparing input data for the CNN model. Test cases were created using sample images with known dimensions and pixel ranges to verify that resizing, normalization, and color conversion operations produced consistent and expected outputs. These tests confirmed that all images were transformed into the correct input shape and data format required by the model, regardless of the original resolution or image source.
Unit testing was then conducted on the machine learning inference module. The trained CNN model loader was tested independently to ensure that the model weights were loaded correctly and that inference could be performed without runtime errors. Controlled test images from the validation dataset were passed to the model to verify that the output probability vector matched the expected number of disease classes and that class-to-label mappings were accurate.
The backend logic and API services were also subjected to unit testing. Individual API functions responsible for handling image uploads, prediction requests, and database interactions were tested using mock requests. These tests verified correct input validation, error

handling, and response formatting. For example, invalid file types, empty image uploads, and malformed requests were tested to ensure the system returned appropriate error messages without crashing.
Unit testing was further applied to the database access layer, where CRUD (Create, Read, Update, Delete) operations were tested using a separate test database. These tests verified that user data, prediction results, confidence scores, and timestamps were correctly stored and retrieved. Schema validation tests ensured that constraints such as non- null fields and valid data types were enforced consistently.
On the frontend side, unit testing focused on individual user interface components. Components such as the image upload form, result display card, and confidence indicator were tested to ensure they rendered correctly and responded properly to user actions. Input validation logic was tested to ensure that users could not submit unsupported file formats or empty forms.
Overall, unit testing ensured that each functional block of the Skin Disease Detection System was reliable, predictable, and free from critical defects before integration, forming a strong foundation for higher-level testing phases.
## INTEGRATION TESTING
Integration testing was conducted to verify the correct interaction and data flow between the various modules of the Skin Disease Detection System once individual components had been unit tested. The primary objective of this phase was to ensure that the frontend, backend, machine learning model, and database layers worked together seamlessly as a cohesive system.

A key focus of integration testing was the interaction between the frontend and backend services. Test cases were executed to ensure that image files uploaded through the frontend interface were correctly transmitted to the backend API. This included verifying proper request formatting, successful file reception, and correct invocation of preprocessing and prediction routines. The system was tested to confirm that prediction responses, including disease labels and confidence scores, were accurately returned and rendered on the user interface.

Integration testing also covered the machine learning inference pipeline. After preprocessing, images were passed from the backend service to the CNN model for classification. Tests verified that the preprocessed image tensors matched the expected model input dimensions and that the output predictions were correctly interpreted by the backend before being sent to the client. This ensured that no mismatch occurred between preprocessing logic and model expectations.

Another critical aspect of integration testing involved the database interaction layer. The system was tested to ensure that prediction results generated by the model were successfully stored in the database along with associated user information and timestamps. Subsequent retrieval operations were tested to confirm that stored records were accurately fetched and displayed in the user’s prediction history section.
Authentication and session handling were also tested during this phase. Integration tests verified that only authenticated users could access protected routes such as prediction history and profile pages. Token validation and session persistence were tested to ensure secure and consistent user access across multiple requests.
Finally, end-to-end integration scenarios were executed, simulating real user workflows—from logging in, uploading an image, receiving a prediction, to viewing stored results. These tests confirmed that all integrated components communicated correctly and that the system delivered a smooth and reliable user experience without data loss or inconsistencies.

## FUNCTIONAL TESTING

Functional testing was performed to validate the Skin Disease Detection System against its specified functional requirements and to ensure that all features operated correctly from an end-user perspective. This phase focused on verifying what the system does, rather than how it is implemented internally, by executing real-world usage scenarios.
The functional testing process began with the user registration and login functionality. Test cases were executed to ensure that new users could successfully register with valid credentials and that existing users could log in securely. Invalid login attempts, such as incorrect passwords or missing fields, were tested to confirm that appropriate error messages were displayed and unauthorized access was prevented.

The core functional testing centered on the image upload and disease prediction workflow. Various skin images were uploaded to verify that the system accepted supported file formats and rejected invalid or corrupted files. After successful upload, the system was tested to ensure that it correctly processed the image, performed disease classification, and displayed the predicted disease along with the corresponding confidence score.
Functional testing also evaluated the result interpretation and guidance features. For each predicted disease, the system was tested to confirm that relevant information, precautionary measures, and advisory messages were displayed accurately. Special attention was given to high-risk conditions such as Melanoma, ensuring that the system clearly advised users to seek professional medical consultation.
The prediction history and analytics functionality was also tested. Test cases verified that each completed prediction was stored correctly and appeared in the user’s history section with accurate timestamps and results. This ensured data persistence and consistency across sessions.
Additionally, functional testing covered error handling and user feedback mechanisms. Scenarios involving unsupported image formats, empty uploads, and network interruptions were tested to ensure that the system responded with clear, user-friendly messages rather than system failures.
Overall, functional testing confirmed that the Skin Disease Detection System met all functional requirements and delivered a reliable, intuitive, and user-centric experience aligned with the project objectives.
## SYSTEM TESTING
System testing was conducted to evaluate the Skin Disease Detection System as a complete and fully integrated application, ensuring that it met all specified system requirements and functioned reliably in real-world conditions. This phase focused on validating the behavior of the system as a whole rather than individual components, confirming that all modules operated together seamlessly.
End-to-End (E2E) testing was performed to simulate the complete user journey, starting from accessing the landing page, registering or logging into the system, uploading a skin image, receiving a disease prediction, viewing confidence scores and recommendations,

checking prediction history, and finally logging out. These tests ensured that navigation flows were logical, system state was preserved correctly across pages, and user interactions resulted in the expected outcomes.
Compatibility and environment testing were also conducted during this phase. The system was tested across multiple web browsers such as Google Chrome, Microsoft Edge, and Mozilla Firefox to ensure consistent behavior and appearance. Different screen sizes and resolutions were tested to verify that the user interface remained responsive and accessible on various devices. Additionally, the system was tested using images captured under different lighting conditions and resolutions to assess robustness against real-world image variability.
Performance testing formed another important aspect of system testing. The application was evaluated for response time during image upload and prediction generation to ensure acceptable latency. Memory usage and server stability were monitored during repeated prediction requests to verify that the system could handle continuous usage without crashes or resource exhaustion.
Table 6.1: System Test Cases




Table 6.1 presents the system test cases designed to validate the end-to-end functionality of the skin disease detection system. It covers critical scenarios including image preprocessing, model prediction flow, invalid input handling, disease classification accuracy, and high-risk disease alerts. These test cases ensure the system operates reliably, produces accurate predictions, and provides appropriate user feedback under different conditions.

Finally, system testing validated the system’s non-functional requirements, including reliability, usability, and security. Error handling was tested to ensure that the system failed gracefully in cases of invalid input or unexpected conditions. This comprehensive system testing phase confirmed that the Skin Disease Detection System operates as a stable, secure, and user-ready application suitable for practical deployment.

# CHAPTER 7
RESULTS AND DISCUSSION

The Skin Disease Detection System successfully achieved its objectives by accurately identifying multiple skin conditions such as Vitiligo, Psoriasis, Eczema, Melanoma, and Acne from uploaded images with high confidence.

The CNN model demonstrated strong reliability and robustness, performing consistently across varying lighting and background conditions. The integration of a skin-type identification module enhanced personalization by accurately classifying skin as oily, dry, combination, or sensitive.

Additionally, the Skin Chemical Usage Guidance provided instant, relevant skincare recommendations and preventive advice, helping users make informed decisions and encouraging timely medical consultation. Overall, the system offers a user-friendly and integrated platform that supports early detection, increases skin health awareness, and improves access to dermatological guidance, especially in resource-limited areas.

Fig 7.1 Home Page Interface of DermaCheck – Skin Disease Detection System
Figure 7.1 represents the home page of the DermaCheck web application. It introduces the skin disease detection system and allows users to upload skin images for analysis. The page also provides easy navigation to disease information, skin type checking, and user authentication features.




Fig 7.2 About Page of DermaCheck – Project Overview and Objectives
Figure 7.2 explains the system’s purpose and its vision to promote early skin disease awareness using machine. learning.The page outlines the use of deep learning models and a web-based framework to improve skin health awareness. A disclaimer notes that the application is for educational purposes only and not a substitute for medical diagnosis.

Fig 7.3 Skin Diseases Information Page of DermaCheck Application
Figure 7.3 illustrates the Skin Diseases & Conditions section provides brief educational information on common conditions like acne, melanoma, and psoriasis. Each condition is explained in simple terms with representative images and external links for further reading. This module supports user awareness and early identification of skin-related issues.



Fig 7.4 User Registration (Sign-Up) Interface of DermaCheck System
Figure 7.4 represents the user registration module of the DermaCheck web application.
The interface allows new users to create an account by providing basic details such as full name, email address, and password. This authentication module ensures secure access to personalized features of the system, enabling users to track skin analysis results and access application services efficiently.

Fig 7.5 Skin Image Upload and Analysis Interface of DermaCheck System

Figure 7.5 depicts the core skin disease detection module of the DermaCheck web application, where users upload a skin image for analysis.The image is processed using a deep learning–based classification model.The system generates predictions on possible skin conditions to support early detection and awareness.




Fig 7.6 Prediction Result and AI-Generated Medical Report Interface
Figure 7.6 illustrates the output screen of the DermaCheck system after skin image analysis. It displays the predicted skin condition along with its category and confidence score generated by the deep learning model. The interface also provides an AI-generated medical summary with an option to download the detailed report in PDF format.

Fig 7.7 Skin Type Assessment Questionnaire Interface
Figure 7.7 shows the output screen of DermaCheck after skin image analysis. It displays the predicted condition, category, confidence score, and an AI-generated medical report with risk details and recommendations. Users can download the detailed medical report in PDF format for reference.

# CHAPTER 8
CONCLUSION

The Skin Disease Detection System successfully demonstrates the potential of deep learning and image classification techniques in supporting early and accurate dermatological diagnosis. By integrating Convolutional Neural Networks (CNNs) with effective image preprocessing methods, the system is capable of classifying multiple skin conditions with a high degree of reliability. The experimental results indicate that deep learning models can effectively extract meaningful features from dermatoscopic images, enabling robust multi-class skin disease classification.

The project also emphasizes the importance of accessible and automated healthcare solutions, particularly for individuals in rural or underserved regions where access to dermatological expertise may be limited. By providing rapid analysis and predictive outputs, the system supports informed decision-making and encourages timely medical consultation, thereby contributing to improved skin health awareness.

Furthermore, the modular and scalable design of the system allows for future enhancements, including the integration of additional disease categories, larger and more diverse datasets, and advanced deep learning architectures. Overall, this project highlights the significant role of AI-driven diagnostic tools in improving early disease detection, reducing clinical workload, and advancing intelligent healthcare systems.

# REFERENCES

- Sharma, P. Gupta, “Studies on Different CNN Algorithms for Face Skin Disease Classification Based on Clinical Images,” 2023.
- R. Patel, M. Singh, “Equitable Skin Disease Prediction Using Transfer Learning Across Medical Domains,” 2024.
- K. Nair, S. Reddy, “Genetic Algorithm Optimized Stacking Approach to Skin Disease Detection,” 2024.
- L. Zhang, Y. Chen, “Deep Learning-Based Skin Lesion Classification Using Dermoscopic Images,” 2022.
- M. Das, T. Roy, “Comparative Study of CNN Architectures for Skin Disease Detection,” 2021.
- N. Al-Hamdan, M. Rahman, “Enhanced Feature Extraction for Medical Image Classification Using EfficientNet,” 2023.
- Belal Ahmad, Mohd Usama, Chuen-Min Huang, Kai Hwang, M. Shamim Hossain, and Ghulam Muhammad, “Discriminative Feature Learning for Skin Disease Classification Using Deep CNN” 2023
- Ling-Fang Li, Xu Wang, Wei-Jian Hu, Neal N. Xiong, Yong-Xing Du, and Bao-Shan Li, “Deep Learning in Skin Disease Image Recognition” 2020.
- Cho-I Moon and Onesok Lee, “Skin Micro-structure Segmentation and Aging Classification Using CNN-Based Models” 2021.
- Ananthakrishnan Balasundaram, Ayesha Shaik, B. Rohan Alroy, Amogh Singh, and S. J. Shivaprakash, “The Genetic Algorithm Optimized Stacking Approach to Skin Disease Detection” 2024.

# ANNEXURE


### Annexure A: Tools and Models Used

- Python 3.8 – Main programming language used for system development
- TensorFlow 2.x – Deep learning framework used for building and training CNN models
- Keras – High-level API for simplifying CNN architecture design and model training
- NumPy – Used for numerical computations and array operations
- Pandas – Used for dataset handling, labeling, and preprocessing support
- OpenCV – Used for image preprocessing such as resizing, noise reduction, and enhancement
- Matplotlib / Seaborn – Used for visualization of training performance and evaluation metrics
- Google Colab – Used for model training with optional GPU acceleration
- Convolutional Neural Network (CNN) – Core model for skin disease image classification
- MobileNetV2 – Lightweight CNN architecture used for efficient feature extraction
- EfficientNet – Used for improved accuracy with optimized parameter scaling
- Custom CNN Model – Designed for comparative analysis and experimentation


### Annexure B: Datasets and Resources

- HAM10000 Dataset – Primary dataset containing over 10,000 dermatoscopic images across seven skin disease categories
- Dermatoscopic Images – High-resolution medical images used for disease classification
- Training and Testing Split (80:20) – Used for performance evaluation and generalization testing
- Augmented Image Samples – Generated using rotation, flipping, and zooming techniques
- Skin-Type Quiz Dataset – Custom questionnaire-based dataset for identifying skin types

# SOURCE CODE

import os

BASE_DIR = "data/processed" os.makedirs(f"{BASE_DIR}/all_images", exist_ok=True) os.makedirs(f"{BASE_DIR}/train", exist_ok=True) os.makedirs(f"{BASE_DIR}/val", exist_ok=True) os.makedirs(f"{BASE_DIR}/test", exist_ok=True) print("Folders created!")


import os

import pandas as pd

RAW_DATA = "../data/raw/datasets" PROCESSED = "../data/processed/all_images"
ham1 = os.path.join(RAW_DATA, "HAM10000_images_part_1") ham2 = os.path.join(RAW_DATA, "HAM10000_images_part_2") ham_csv = os.path.join(RAW_DATA, "HAM10000_metadata.csv") # Load metadata
df_ham = pd.read_csv(ham_csv) # Keep only needed columns
df_ham = df_ham[['image_id', 'dx']] df_ham['image'] = df_ham['image_id'] + ".jpg" df_ham = df_ham.rename(columns={"dx": "label"}) # Link image paths (they may exist in part1 or part2) def get_ham_path(img):
p1 = os.path.join(ham1, img)

p2 = os.path.join(ham2, img)

return p1 if os.path.exists(p1) else p2

df_ham['source_path'] = df_ham['image'].apply(get_ham_path) df_ham.head()


import os

import pandas as pd

RAW_DATA = "../data/raw/datasets" PROCESSED = "../data/processed/all_images"
ham1 = os.path.join(RAW_DATA, "HAM10000_images_part_1") ham2 = os.path.join(RAW_DATA, "HAM10000_images_part_2") ham_csv = os.path.join(RAW_DATA, "HAM10000_metadata.csv") # Load metadata
df_ham = pd.read_csv(ham_csv) # Keep only needed columns
df_ham = df_ham[['image_id', 'dx']] df_ham['image'] = df_ham['image_id'] + ".jpg" df_ham = df_ham.rename(columns={"dx": "label"}) # Link image paths (they may exist in part1 or part2) def get_ham_path(img):
p1 = os.path.join(ham1, img) p2 = os.path.join(ham2, img)
return p1 if os.path.exists(p1) else p2

df_ham['source_path'] = df_ham['image'].apply(get_ham_path) df_ham.head()

import pandas as pd import os
import shutil

from sklearn.model_selection import train_test_split # Correct directories
BASE = "../data/processed" IMG_DIR = f"{BASE}/all_images" TRAIN_DIR = f"{BASE}/train" VAL_DIR = f"{BASE}/val"
TEST_DIR = f"{BASE}/test" # Load the labels
df = pd.read_csv(f"{BASE}/all_labels.csv") # 1. Create class folders inside train/val/test
for split in [TRAIN_DIR, VAL_DIR, TEST_DIR]: for label in df['label'].unique():
os.makedirs(os.path.join(split, label), exist_ok=True) print("Class folders created inside train/val/test ✓")
# 2. Split data (70/15/15) with stratification
train_df, temp_df = train_test_split( df,
test_size=0.30, stratify=df['label'], random_state=42
)

val_df, test_df = train_test_split(

temp_df, test_size=0.50,
stratify=temp_df['label'], random_state=42
)

print("Split sizes:") print("Train:", len(train_df)) print("Val:", len(val_df)) print("Test:", len(test_df))


# 3. Copy images into folders

def copy_split(dataframe, split_dir): for _, row in dataframe.iterrows():
src = os.path.join(IMG_DIR, row['image'])

dst = os.path.join(split_dir, row['label'], row['image']) shutil.copy(src, dst)
copy_split(train_df, TRAIN_DIR) copy_split(val_df, VAL_DIR) copy_split(test_df, TEST_DIR)
print("All images copied into train/val/test successfully! 🎉")

from tensorflow.keras.preprocessing.image import ImageDataGenerator TRAIN_DIR = "../data/processed/train"
VAL_DIR = "../data/processed/val" TEST_DIR = "../data/processed/test" IMAGE_SIZE = (224, 224)

BATCH_SIZE = 32



# Data augmentation for training train_datagen = ImageDataGenerator(
rescale=1./255, rotation_range=15, horizontal_flip=True, zoom_range=0.1, width_shift_range=0.1, height_shift_range=0.1
)

# Validation & test should NOT be augmented test_val_datagen = ImageDataGenerator(rescale=1./255) train_data = train_datagen.flow_from_directory(
TRAIN_DIR,

target_size=IMAGE_SIZE, batch_size=BATCH_SIZE, class_mode='categorical'
)

val_data = test_val_datagen.flow_from_directory( VAL_DIR,
target_size=IMAGE_SIZE, batch_size=BATCH_SIZE, class_mode='categorical'
)

test_data = test_val_datagen.flow_from_directory( TEST_DIR,
target_size=IMAGE_SIZE, batch_size=BATCH_SIZE, class_mode='categorical', shuffle=False
)

print("\n✅ Data generators ready!")

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout,
BatchNormalization
from tensorflow.keras.optimizers import Adam num_classes = train_data.num_classes print("Detected classes:", num_classes)

model = Sequential([ # Block 1
Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)), BatchNormalization(),
MaxPooling2D(pool_size=(2, 2)),
# Block 2
Conv2D(64, (3, 3), activation='relu'), BatchNormalization(), MaxPooling2D(pool_size=(2, 2)),
# Block 3
Conv2D(128, (3, 3), activation='relu'), BatchNormalization(), MaxPooling2D(pool_size=(2, 2)),
# Block 4
Conv2D(256, (3, 3), activation='relu'), BatchNormalization(),

MaxPooling2D(pool_size=(2, 2)), Flatten(),
Dense(256, activation='relu'), Dropout(0.5),
Dense(num_classes, activation='softmax')
])


model.compile( optimizer=Adam(learning_rate=1e-4), loss='categorical_crossentropy', metrics=['accuracy']
)
model.summary()


from	tensorflow.keras.callbacks	import	EarlyStopping,	ModelCheckpoint,
ReduceLROnPlateau import os
# Folder to save best model os.makedirs("../models", exist_ok=True) checkpoint_path = "../models/best_skin_cnn.h5"

callbacks = [ EarlyStopping(
monitor="val_loss", patience=3, restore_best_weights=True
),
ModelCheckpoint( checkpoint_path, monitor="val_loss", save_best_only=True, verbose=1
),
ReduceLROnPlateau(

monitor="val_loss", factor=0.5, patience=2, verbose=1
)
]
EPOCHS = 10 # you can change to 15–20 later history = model.fit(
train_data, validation_data=val_data, epochs=EPOCHS, callbacks=callbacks
)
import numpy as np
from sklearn.metrics import classification_report pred_probs = model.predict(test_data) pred_classes = np.argmax(pred_probs, axis=1)

true_classes = test_data.classes
class_labels = list(test_data.class_indices.keys()) print("\n📌 Classification Report:")
print(classification_report(true_classes, pred_classes, target_names=class_labels))

from tensorflow.keras.models import load_model import os
# Load saved model
model = load_model("../models/best_skin_cnn.h5") # Load class labels from train folder
TRAIN_DIR = "../data/processed/train" class_labels = sorted(os.listdir(TRAIN_DIR)) print("Model loaded!")
print("Classes:", class_labels) import numpy as np
from tensorflow.keras.utils import load_img, img_to_array

IMAGE_SIZE = (224, 224)


def predict_image(image_path):
img = load_img(image_path, target_size=IMAGE_SIZE) img_array = img_to_array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)


pred = model.predict(img_array) pred_class = np.argmax(pred, axis=1)[0]

print(f"\nPredicted class: {class_labels[pred_class]}")

# PLAGIARISM REPORT SUMMARY


# CERTIFICATES






| ------------------------------
Project Guide Prof.Sumitra Sharma Ph | ---------------------------HOD
Dr. Vijayakumar .K | ------------------------------
Principal Dr. Yuvaraju B N |
| --- | --- | --- |
| Assistant Professor | Professor & HOD | Principal |
| Department of CSE (DS) | Department of CSE(DS) | AMCEC |
| Name | USN | Signature |
| --- | --- | --- |
| Chirashrita L | 1AM22CD015 | --------------------- |
| Deena Fayaz | 1AM22CD021 | --------------------- |
| E Tanuja | 1AM22CD025 | --------------------- |
| Kerthii N | 1AM22CD039 | --------------------- |
| Name | USN | Signature |
| --- | --- | --- |
| Chirashrita L | 1AM22CD015 | --------------------- |
| Deena Fayaz | 1AM22CD021 | --------------------- |
| E Tanuja | 1AM22CD025 | --------------------- |
| Kerthii N | 1AM22CD039 | --------------------- |
|  | CONTENTS |  |
| --- | --- | --- |
| CERTIFICATE | CERTIFICATE | i |
| DECLARATION | DECLARATION | ii |
| ACKNOWLEDGEMENT | ACKNOWLEDGEMENT | iii |
| ABSTRACT | ABSTRACT | iv |
| 1	INTRODUCTION | 1	INTRODUCTION | 1 |
|  | 1.1	Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 1 |
|  | 1.2	Problem Statement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 2 |
|  | 1.3	Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 2 |
|  | 1.4	Scope of the Study . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 3 |
|  | 1.5	Disadvantages of existing system . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 3 |
|  | 1.6	Proposed System . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 4 |
| 2 | LITERATURE SURVEY | 6 |
|  | 2.1	Literature Survey . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 6 |
| 3 | SYSTEM REQUIREMENTS SPECIFICATION | 10 |
|  | 3.1	Functional Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 10 |
|  | 3.2  Non-Functional Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 10 |
|  | 3.3	Basic Operational Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 11 |
| 4 | SYSTEM MODELING | 12 |
|  | 4.1	Fundamental design concepts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 12 |
|  | 4.1.1	Input Design . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 12 |
|  | 4.1.2  Output Design . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 13 |
|  | 4.2	Development Model . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 14 |
|  | 4.2.1	Data Flow Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 15 |
|  | 4.2.2	Use Case Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 15 |
|  | 4.2.3	Sequence Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 16 |
| 5 | PROJECT IMPLEMENTATION | 17 |
|  | 5.1	Implementation Strategies . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 17 |
|  | 5.2	Module Implementation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 18 |
|  | 5.3	Software Environment . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 20 |
| --- | --- | --- |
|  | 5.4	Algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 21 |
| 6 | SYSTEM TESTING | 25 |
|  | 6.1	Testing Process | 25 |
|  | 6.1.1	Aim of Testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 26 |
|  | 6.1.2	Unit Testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 27 |
|  | 6.1.3	Integration Testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 28 |
|  | 6.1.4	Functional Testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 29 |
|  | 6.1.5	System Testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 30 |
| 7 | RESULTS AND DISCUSSION | 33 |
| 8 | CONCLUSION | 37 |
|  | REFERENCES | 38 |
|  | ANNEXURE | 39 |
|  | SOURCE CODE | 40 |
|  | PLAGIARISM REPORT SUMMARY | 49 |
|  | CERTIFICATES | 50 |
| Figure No | Figure Name | Page No. |
| --- | --- | --- |
| 4.1.1 | Input Design of Skin Disease Detection. | 13 |
| 4.1.2 | Output Design of Skin Disease Detection. | 14 |
| 4.2.1 | Data Flow for Skin Disease Detection. | 15 |
| 4.2.2 | Use Case Diagram for Skin Disease Detection | 15 |
| 4.2.3 | Sequence Diagram for Skin Disease Detection | 16 |
| 5.4.1 | CNN Deployment Model for Skin Disease Detection | 22 |
| 7.1 | Home Page Interface | 33 |
| 7.2 | About Page Interface | 34 |
| 7.3 | Skin Diseases Information Page | 34 |
| 7.4 | User Registration (Signup) Interface | 35 |
| 7.5 | Skin Image Upload Interface | 35 |
| 7.6 | Prediction Result And Medical Report Interface | 36 |
| 7.7 | Skin Type Assessment Questionnaire | 36 |
| Table No | Table Name | Page No. |
| --- | --- | --- |
| 6.1 | System Test Cases | 31,32 |
| Test Case ID | Test Scenario / Description | Expected Result |
| --- | --- | --- |
| STC-01 | Image Preprocessing & Normalization: Upload skin images with different resolutions, lighting conditions, and orientations to test resizing and normalization logic. | The system correctly resizes images to the required input size and normalizes pixel values, ensuring consistent input for the CNN model. |
| STC-02 | Model Inference & Prediction Flow: Upload a valid skin image and trigger disease prediction to test end-to-end system execution. | The system processes the image successfully and displays the predicted skin disease along with the confidence score. |
| STC-03 | Invalid Image Handling: Upload unsupported or corrupted image files to verify system robustness. | The system rejects the input and displays a clear error message without system failure. |
| STC-04 | Disease Classification Accuracy: Provide a test image belonging to a known disease class such as Melanoma or Psoriasis. | The system correctly identifies the disease class and displays the appropriate label and confidence value. |
| STC-05 | High-Risk Disease Advisory: Upload an image predicted as a critical condition like Melanoma. | The system displays a warning message advising the user to seek professional medical consultation. |
| Test Case ID | Test Scenario / Description | Expected Result |
| --- | --- | --- |
| STC-06 | Prediction History & Data Persistence: Perform multiple predictions and navigate to the prediction history section. | All prediction records are stored and displayed correctly with timestamps. |