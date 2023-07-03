import {useDebugValue, useEffect, useState} from "react";
import "./CreateSpotForm.css";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";

export default function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [spotName, setSpotName] = useState("");
  const [price, setPrice] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [errors, setErrors] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);

  useEffect(() => {
    const errorsObj = {};

    if (!country) errorsObj.country = "Country is required";
    if (!address) errorsObj.address = "Address is required";
    if (!city) errorsObj.city = "City is required";
    if (!state) errorsObj.state = "State is required";
    if (!spotName) errorsObj.spotName = "Name is required";
    if (!price) errorsObj.price = "Price is required";
    if (!img1) errorsObj.img1 = "Preview image is required";

    if (description.length < 30)
      errorsObj.description = "Description needs a minimum of 30 characters";

    if (
      img1 &&
      (!img1.endsWith(".png") ||
        !img1.endsWith(".jpg") ||
        !img1.endsWith(".jpeg"))
    )
      errorsObj.img1 = "Image URL must end in .png, .jpg, .jpeg";

    if (
      img2 &&
      (!img2.endsWith(".png") ||
        !img2.endsWith(".jpg") ||
        !img2.endsWith(".jpeg"))
    )
      errorsObj.img2 = "Image URL must end in .png, .jpg, .jpeg";
    if (
      img3 &&
      (!img3.endsWith(".png") ||
        !img3.endsWith(".jpg") ||
        !img3.endsWith(".jpeg"))
    )
      errorsObj.img3 = "Image URL must end in .png, .jpg, .jpeg";
    if (
      img4 &&
      (!img4.endsWith(".png") ||
        !img4.endsWith(".jpg") ||
        !img4.endsWith(".jpeg"))
    )
      errorsObj.img4 = "Image URL must end in .png, .jpg, .jpeg";
    if (
      img5 &&
      (!img5.endsWith(".png") ||
        !img5.endsWith(".jpg") ||
        !img5.endsWith(".jpeg"))
    )
      errorsObj.img5 = "Image URL must end in .png, .jpg, .jpeg";
    setErrors(errorsObj);
  }, [
    country,
    address,
    city,
    state,
    spotName,
    price,
    img1,
    description,
    img2,
    img3,
    img4,
    img5,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDidSubmit(true);
  };

  return (
    <div className="wrapper-div">
      <form className="spot-form" onSubmit={handleSubmit}>
        <div
          style={{
            border: "1px solid red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <h3>Create a new Spot</h3>
          <div>Where's your place located?</div>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </div>
        <label>Country</label>
        {didSubmit && <p>{errors.country}</p>}
        <input
          type="text"
          placeholder="United States of America"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Street Address</label>
        {didSubmit && <p>{errors.address}</p>}
        <input
          type="text"
          placeholder="123 Main Street"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div style={{border: "1px solid red"}}>
          <label>City</label>
          {didSubmit && <p>{errors.city}</p>}
          <input
            type="text"
            placeholder="San Francisco"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>State</label>
          {didSubmit && <p>{errors.state}</p>}
          <input
            type="text"
            value={state}
            placeholder="CA"
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="des-div" style={{border: "1px orange solid"}}>
          <h4>Describe your place to Guests</h4>
          <div>
            Mention the best features of your space, any special amentities like
            fast wifi or paking, and what you love about the neighborhood.
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
          {didSubmit && <p>{errors.description}</p>}
        </div>
        <div>
          <h4>Create a title for your spot</h4>
          <p>
            Catch guests' attention with a spot that highlights what makes your
            place special.
          </p>
          <input
            type="text"
            value={spotName}
            onChange={(e) => setSpotName(e.target.value)}
            placeholder="Name of your spot"
          />
          {didSubmit && <p>{errors.spotName}</p>}
        </div>
        <div>
          <h4>Set a base price for your spot</h4>
          <p>
            Competitive pricing can help your list stand out and rank higher in
            search results
          </p>
          <span>$</span>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
          />
          {didSubmit && <p>{errors.price}</p>}
        </div>
        <div>
          <h4>Liven up your spot with photos</h4>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <div className="img-input-div">
            <input
              type="url"
              value={img1}
              onChange={(e) => setImg1(e.target.value)}
              placeholder="Preview Image URL"
            />
            {didSubmit && <p>{errors.img1}</p>}
            <input
              type="url"
              value={img2}
              onChange={(e) => setImg2(e.target.value)}
              placeholder="Image URL"
            />

            <input
              type="url"
              value={img3}
              onChange={(e) => setImg3(e.target.value)}
              placeholder="Image URL"
            />
            <input
              type="url"
              value={img4}
              onChange={(e) => setImg4(e.target.value)}
              placeholder="Image URL"
            />
            <input
              type="url"
              value={img5}
              onChange={(e) => setImg5(e.target.value)}
              placeholder="Image URL"
            />
          </div>
        </div>
        <button className="spot-button" type="submit">
          Create Spot
        </button>
      </form>
    </div>
  );
}
