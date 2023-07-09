import {useEffect, useState} from "react";
import "./CreateSpotForm.css";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {createSpotThunk} from "../../store/spotsReducer";

const usStates = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "AS",
  "GU",
  "MP",
  "PR",
  "VI",
];

const fixedPrice = (price) => (+price).toFixed(2);

const lettersOnly = (word) => {
  return /^[A-Za-z\s]*$/.test(word);
};

const isValid = (str) => {
  var regex = /^[a-zA-Z0-9\s]+$/;
  return regex.test(str);
};

export default function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  // const owner = useSelector((state) => {
  //   console.log("this is session user", state.session.user);
  //   return state.session.user;
  // });
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
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
    if (!name) errorsObj.name = "Name is required";
    if (!price) errorsObj.price = "Price is required";
    if (!img1) errorsObj.img1 = "Preview image is required";

    if (!isValid(address)) errorsObj.address = "Please enter a valid address";

    if (!lettersOnly(city)) errorsObj.city = "Please enter a valid city";

    if (!lettersOnly(country))
      errorsObj.country = "Please input a valid country";

    if (name.length > 50)
      errorsObj.name = "Name must be less than 50 characters";

    if (description.length > 4800)
      errorsObj.description = "Description must be less than 4800 characters";

    if (description.length < 30)
      errorsObj.description = "Description needs a minimum of 30 characters";

    if (isNaN(price)) errorsObj.price = "Please input a number value";

    if (price < 0) errorsObj.price = "Price must be at least 0";

    if (!usStates.includes(state.toUpperCase()))
      errorsObj.state =
        "Please enter a capitalized valid US State (i.e CA or HI)";

    if (
      img1 &&
      !img1.endsWith(".png") &&
      !img1.endsWith(".jpg") &&
      !img1.endsWith(".jpeg")
    )
      errorsObj.img1 = "Image URL must end in .png, .jpg, .jpeg";

    if (
      img2 &&
      !img2.endsWith(".png") &&
      !img2.endsWith(".jpg") &&
      !img2.endsWith(".jpeg")
    )
      errorsObj.img2 = "Image URL must end in .png, .jpg, .jpeg";
    if (
      img3 &&
      !img3.endsWith(".png") &&
      !img3.endsWith(".jpg") &&
      !img3.endsWith(".jpeg")
    )
      errorsObj.img3 = "Image URL must end in .png, .jpg, .jpeg";
    if (
      img4 &&
      !img4.endsWith(".png") &&
      !img4.endsWith(".jpg") &&
      !img4.endsWith(".jpeg")
    )
      errorsObj.img4 = "Image URL must end in .png, .jpg, .jpeg";
    if (
      img5 &&
      !img5.endsWith(".png") &&
      !img5.endsWith(".jpg") &&
      !img5.endsWith(".jpeg")
    )
      errorsObj.img5 = "Image URL must end in .png, .jpg, .jpeg";
    setErrors(errorsObj);
  }, [
    country,
    address,
    city,
    state,
    name,
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
    if (Object.keys(errors).length > 0) {
      return alert("Please enter valid information to create your spot.");
    }

    setErrors({});

    const newPrice = fixedPrice(price);

    const newSpot = {
      address,
      city,
      state: state.toUpperCase(),
      country,
      lat: 37.76,
      lng: -122.47,
      name,
      description,
      price: newPrice,
      previewImage: img1,
      img2,
      img3,
      img4,
      img5,
    };

    const spotImages = [];

    if (img1) {
      const img1Obj = {
        url: img1,
        preview: true,
      };
      spotImages.push(img1Obj);
    }
    if (img2) {
      const img2Obj = {
        url: img2,
        preview: false,
      };
      spotImages.push(img2Obj);
    }
    if (img3) {
      const img3Obj = {
        url: img3,
        preview: false,
      };
      spotImages.push(img3Obj);
    }
    if (img4) {
      const img4Obj = {
        url: img4,
        preview: false,
      };
      spotImages.push(img4Obj);
    }
    if (img5) {
      const img5Obj = {
        url: img1,
        preview: false,
      };
      spotImages.push(img5Obj);
    }

    console.log("spotImages", spotImages);

    console.log("newSpot", newSpot);

    const dispatchedSpot = await dispatch(createSpotThunk(newSpot, spotImages));

    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setName("");
    setPrice("");
    setImg1("");
    setImg2("");
    setImg3("");
    setImg4("");
    setImg5("");

    if (dispatchedSpot) history.push(`/spots/${dispatchedSpot.id}`);
  };

  return (
    <div className="wrapper-div">
      <form className="spot-form" onSubmit={handleSubmit}>
        <div>
          <h2 className="update-head">Create a new Spot</h2>
          <div className="where">Where's your place located?</div>
          <p className="guest">
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </div>

        <div className="country">
          <label>Country</label>

          <input
            className="count-input"
            type="text"
            placeholder="United States of America"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        {didSubmit && errors.country && (
          <p className="sign-err">{errors.country}</p>
        )}
        <div className="street">
          <label>Street Address</label>

          <input
            className="count-input"
            type="text"
            placeholder="123 Main Street"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {didSubmit && errors.address && (
          <p className="sign-err">{errors.address}</p>
        )}
        <div className="c-s">
          <div className="city">
            <label>City</label>

            <input
              className="c-input"
              type="text"
              placeholder="San Francisco"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {didSubmit && errors.city && (
              <p className="sign-err">{errors.city}</p>
            )}
          </div>

          <div className="comma">,</div>
          <div className="state">
            <label>State</label>

            <input
              className="s-input"
              type="text"
              value={state}
              placeholder="CA"
              onChange={(e) => setState(e.target.value)}
            />
            {didSubmit && errors.state && (
              <p className="sign-err">{errors.state}</p>
            )}
          </div>
        </div>
        <div className="des-div">
          <div className="describe">Describe your place to Guests</div>
          <div className="mention">
            Mention the best features of your space, any special amentities like
            fast wifi or paking, and what you love about the neighborhood.
          </div>
          <textarea
            className="des-area"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
          {didSubmit && errors.description && (
            <p className="sign-err">{errors.description}</p>
          )}
        </div>
        <div className="name-div">
          <div className="name-head">Create a title for your spot</div>
          <div className="catch">
            Catch guests' attention with a spot that highlights what makes your
            place special.
          </div>
          <input
            className="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your spot"
          />
          {didSubmit && errors.name && (
            <p className="sign-err">{errors.name}</p>
          )}
        </div>
        <div className="money-div">
          <div className="name-head">Set a base price for your spot</div>
          <div className="catch">
            Competitive pricing can help your list stand out and rank higher in
            search results
          </div>
          <div className="money">
            <div className="cash">$</div>
            <input
              className="price-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
            />
          </div>
          {didSubmit && errors.price && (
            <p className="sign-err">{errors.price}</p>
          )}
        </div>
        <div className="pics-wrap">
          <div className="name-head">Liven up your spot with photos</div>
          <div className="catch">
            Submit a link to at least one photo to publish your spot.
          </div>
          <div className="img-input-div">
            <input
              className="pic-input"
              type="url"
              value={img1}
              onChange={(e) => setImg1(e.target.value)}
              placeholder="Preview Image URL"
            />
            {didSubmit && errors.img1 && (
              <p className="sign-err">{errors.img1}</p>
            )}
            <input
              className="pic-input"
              type="url"
              value={img2}
              onChange={(e) => setImg2(e.target.value)}
              placeholder="Image URL"
            />
            {didSubmit && errors.img2 && (
              <p className="sign-err">{errors.img2}</p>
            )}
            <input
              className="pic-input"
              type="url"
              value={img3}
              onChange={(e) => setImg3(e.target.value)}
              placeholder="Image URL"
            />
            {didSubmit && errors.img3 && (
              <p className="sign-err">{errors.img3}</p>
            )}
            <input
              className="pic-input"
              type="url"
              value={img4}
              onChange={(e) => setImg4(e.target.value)}
              placeholder="Image URL"
            />
            {didSubmit && errors.img4 && (
              <p className="sign-err">{errors.img4}</p>
            )}
            <input
              className="pic-input"
              type="url"
              value={img5}
              onChange={(e) => setImg5(e.target.value)}
              placeholder="Image URL"
            />
            {didSubmit && errors.img5 && (
              <p className="sign-err">{errors.img5}</p>
            )}
          </div>
        </div>
        <button className="spot-button" type="submit">
          Create Spot
        </button>
      </form>
    </div>
  );
}
