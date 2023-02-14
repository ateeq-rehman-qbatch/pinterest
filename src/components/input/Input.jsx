import React from "react";
import Form from "react-bootstrap/Form";

const Input = (props) => {
  const { label, placeholder, type, register, textarea, required} = props;
  return (
    <div className="form-input">
      <Form.Group className="mb-1 mt-3">
        <Form.Label>{label}</Form.Label>
        {textarea ? (
          <Form.Control
            as="textarea"
            rows={4}
            placeholder={placeholder}
            {...register}
            required = {required}
          />
        ) : (
          <Form.Control
            type={type}
            placeholder={placeholder}
            {...register}
            required = {required}
          />
        )}
      </Form.Group>
    </div>
  );
};

export default Input;
