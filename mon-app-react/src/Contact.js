import React, { useState } from 'react';

function Contact() {
  const [nom, setNom] = useState('');

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Un nom a été soumis : ' + nom);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom :
        <input type="text" value={nom} onChange={handleNomChange} />
      </label>
      <button type="submit">Soumettre</button>
    </form>
  );
}

export default Contact;
