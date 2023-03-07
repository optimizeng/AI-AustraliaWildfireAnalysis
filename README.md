# AI-AustraliaWildfireAnalysis - A Machine Learning Approach

**Exploratory analysis of wildfires in Australia & a machine learning approach for wildfire modeling on Google Earth Engine**

Earth's free remotely sensed data provides a means to analyze Australian wildfires. This study investigates data from Earth observation to uncover general insights about these fires. Recent years have seen machine learning (ML) being successful in many domains because it's capable of learning from hidden relationships.

In this study, the overall objective is to create an automated process of creating a fire training dataset at a continental scale, efficiently using computational resources for the ML algorithms. We mapped fire occurrence locations and no-fire occurrence locations alongside 15 fire causal factors.

**We applied the training dataset to different ML algorithms, such as Random Forest (RF), Naïve Bayes, and Classification and Regression Tree (CART).**

All ML approaches were trained using 70% of the wildfire dataset and tested using the remaining 30% of the dataset. The ML algorithm with the best performance, the RF model, helps to identify the driving factors using variable importance analysis based on ML methods. This model can learn certain properties from a training dataset to make predictions. The results of this study reveal the fire occurrence probability in Australia and identify the driving factors and their dynamic influence on fire occurrence. Knowing these factors, we can implement improved preventive measures in fire-prone areas to reduce fire risk in Australia..


![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_1.PNG)

The rest of the README goes into more depth about the data mining and pre-processing steps, the independent and dependent variables used in the model, the results of the ML models and the assessment of their accuracies, and the importance of conditioning factors in the model. Several images and graphs are included to visually illustrate these points.


![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_2.PNG)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_7.PNG)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_11.PNG)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_3.PNG)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_4.PNG)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_5.PNG)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_6.PNG)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_66.PNG)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_8.PNG)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/Cap_9.PNG)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/CART.png)

![Image](https://github.com/optimizeng/AI-AustraliaWildfireAnalysis/blob/master/image/RF.png)

![Image](https://github.com/optimizeng