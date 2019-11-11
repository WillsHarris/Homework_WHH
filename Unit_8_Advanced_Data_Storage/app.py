import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///Resources/hawaii.sqlite")


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

Measurement = Base.classes.measurement
Station = Base.classes.station


# 2. Create an app, being sure to pass __name__

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Flask Routes
#################################################

# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    print("List all available api routes.")
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/start<br/>"
        f"/api/v1.0/start/end<br/>"
    )


@app.route("/api/v1.0/precipitation")
def precipitation():
    
    session = Session(engine)

    dates = session.query(Measurement.date).all()
    prcp = session.query(Measurement.prcp).all()

    session.close()

    all_dates = list(np.ravel(dates))
    all_prcp = list(np.ravel(prcp))

    thisdict =	{
  	"dates": all_dates,
  	"prcp": all_prcp,
	}

    return jsonify(thisdict)


@app.route("/api/v1.0/stations")
def stations():
    
    session = Session(engine)



    stations = session.query(Measurement.station).group_by(Measurement.station).all()


    session.close()

    all_stations = list(np.ravel(stations))

    thisdict =	{
  	"stations": all_stations
	}

    return jsonify(thisdict)



@app.route("/api/v1.0/tobs")
def tobs():
    session = Session(engine)
    end_date = session.query(func.max(Measurement.date)).all()
    
    end_date= list(np.ravel(end_date))
    end_date_dt = pd.to_datetime(end_date)
    start_date = (end_date_dt - dt.timedelta(days=365)).strftime("%Y-%m-%d")
    start_date = list(np.ravel(start_date))
    
    # return jsonify(start_date)

    dates = session.query(Measurement.date).filter(Measurement.date > start_date[0]).all()
    tobs = session.query(Measurement.tobs).filter(Measurement.date > start_date[0]).all()

    session.close()

    dates = session.query(Measurement.date).all()
    tobs = session.query(Measurement.prcp).all()

    all_dates = list(np.ravel(dates))
    all_tobs = list(np.ravel(tobs))

    thisdict =  {
    "dates": all_dates,
    "tobs": all_tobs,
    }

    return jsonify(thisdict)
    

@app.route("/api/v1.0/<start>")
@app.route("/api/v1.0/<start>/<end>")
def start(start=None, end=None):
    session = Session(engine)
    if not end:
        find = [func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)]
        dates = session.query(*find).filter(Measurement.date > start).all()
        all_dates = list(np.ravel(dates))
        thisdict =  {"dates": all_dates}
        return jsonify(thisdict)

    find = [func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)]
    dates = session.query(*find).filter(Measurement.date > start).filter(Measurement.date < end).all()
    all_dates = list(np.ravel(dates))
    thisdict =  {"dates": all_dates}
    return jsonify(thisdict)


    session.close()
    




# Define main behavior
if __name__ == "__main__":
    app.run(debug=True)