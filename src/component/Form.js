import React from "react";

export default function Form(props) {
  return (
    // Form to Post albums and update

    <div>
      <form className="mt-5" onSubmit={props.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User id
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
            name="userId"
            value={props.userId}
            onChange={props.handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            Id
          </label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            value={props.id}
            onChange={props.handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={props.title}
            onChange={props.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post Album
        </button>
        <button
          type="submit"
          className="btn btn-primary ml-3"
          onClick={() => props.handleUpdate()}
        >
          Update Album
        </button>
      </form>
    </div>
  );
}
