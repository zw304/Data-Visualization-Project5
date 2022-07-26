
### 1. Install the packages hvplot and datashader, as well as the fastparquet package.
import pandas as pd
import datetime
import hvplot.pandas
import datashader
import fastparquet

### 2. Load the data into your Python session using pandas to create a Pandas DataFrame object.
## utilize delimiter function in pandas
dat = pd.read_table("data/household_power_consumption.txt",delimiter = ";",low_memory=False)
#dat.head()


### 3. We can now plot the full time series # hvplot package --> datashade=True
### i. There is a bit of data munging to be done.
# We have to derive a datetime object from the data.
dat["datetime"] = dat["Date"] + ' ' +dat["Time"].astype(str)
dat["datetime"].head()
## check data type:
dat.dtypes

dat["datetime"] = pd.to_datetime(dat["datetime"], format='%d/%m/%Y %H:%M:%S')

len(dat.columns) ## 10
##  convert the target variable: Global_active_power into a numeric data type
dat["Global_active_power"] = pd.to_numeric(dat["Global_active_power"],errors='coerce')

print(dat)

### ii & iii. Use dat.hvplot.scatter to create a scatter plot of Global_active_power against datetime utilizing datashader's capabilities.
f=dat.hvplot.scatter('datetime','Global_active_power',groupby=[],title = "Scatter Plot of Global Electricity Consumption", datashade=True)

hvplot.show(f) ## show the scatter plot

### 4. We will save the data set as a parquet file, called power.parquet.

dat.to_parquet('power.parquet')
