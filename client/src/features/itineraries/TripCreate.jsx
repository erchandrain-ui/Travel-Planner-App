import React, {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

export default function TripCreate() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      destination: "",
      start: "",
      end: "",
      budget: "",
      notes: ""
    });

  const change = event => {

    setForm({
      ...form,
      [event.target.name]:
        event.target.value
    });

  };

  const submit = event => {

    event.preventDefault();

    const id = Date.now();

    localStorage.setItem(
      "trip_" + id,
      JSON.stringify(form)
    );

    navigate("/trips/" + id);
  };

  return (

    <>

      <div className="page-head">

        <div>

          <h1>
            Plan a new trip
          </h1>

          <div className="muted">
            Create your destination,
            dates and budget.
          </div>

        </div>

      </div>


      <form
        className="card form"
        onSubmit={submit}
      >

        <div className="field">

          <label>
            Destination
          </label>

          <input
            name="destination"
            required
            placeholder="e.g. Paris, France"
            value={form.destination}
            onChange={change}
          />

        </div>


        <div
          className="grid"
          style={{
            gridTemplateColumns:
              "1fr 1fr"
          }}
        >

          <div className="field">

            <label>
              Start date
            </label>

            <input
              type="date"
              name="start"
              required
              value={form.start}
              onChange={change}
            />

          </div>


          <div className="field">

            <label>
              End date
            </label>

            <input
              type="date"
              name="end"
              required
              value={form.end}
              onChange={change}
            />

          </div>

        </div>


        <div className="field">

          <label>
            Budget (₹)
          </label>

          <input
            type="number"
            name="budget"
            placeholder="50000"
            value={form.budget}
            onChange={change}
          />

        </div>


        <div className="field">

          <label>
            Notes
          </label>

          <textarea
            rows="4"
            name="notes"
            placeholder="What do you want to do?"
            value={form.notes}
            onChange={change}
          />

        </div>


        <button className="btn btn-primary">
          Create Trip
        </button>

      </form>

    </>
  );
}