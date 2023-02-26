# AI-AustraliaWildfireAnalysis - A Machine Learning Approach

**Exploratory analysis of wildfires in Australia & a machine learning approach for wildfire modeling on Google Earth Engine**

Earth's free remotely sensed data provides a means to analyze Australian wildfires. This study investigates data from Earth observation to uncover general insights about these fires. Recent years have seen machine learning (ML) being successful in many domains because it's capable of learning from hidden relationships.

In this study, the overall objective is to create an automated process of creating a fire training dataset at a continental scale, efficiently using computational resources for the ML algorithms. We mapped fire occurrence locations and no-fire occurrence locations alongside 15 fire causal factors.

**We applied the training dataset to different ML algorithms, such as Random Forest (RF), Naïve Bayes, and Classification and Regression Tree (CART).**

All ML approaches were trained using 70% of the wildfire dataset and tested using the remaining 30% of the dataset. The ML algorithm with the best performance, the RF model, helps to identify the driving factors using variable importance analysis based on ML methods. This model can learn certain properties from a training dataset to make predictions. The results of this study reveal