
## STEP 1: 
#install.packages("r2d3")
library(r2d3) #This automates much of d3 development within RStudio.
library(arrow)
library(dplyr)
dat<-read_parquet("power.parquet")

## STEP 2 & 3: 
str(dat) ## Make sure that the Global_active_power variable is numeric.

##Created dat2 (daily total electric consumption): group the data by the Date variable, and take the sum of the Global_active_power variable
dat$Date<- as.Date(dat$Date,format = "%d/%m/%Y")
dat2 <- dat %>% group_by(Date) %>%
  summarise(Global_active_power = sum(Global_active_power),.groups="drop")

str(dat2) 

## change column names: 
colnames(dat2)[which(names(dat2) == 'Global_active_power')] <- "daily_total_electric_consumption"


## STEP 4:  Copy & modify d3-template.js --> plot the data from dat2 using d3.js
# start with making the axes 
# --> then, plotting the line 
# --> then adding the axis labels
## check assignment-d3.js for relative codes. 

r2d3(data=dat2, script = "assignment-d3.js") ## save the image
