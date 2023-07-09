import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom/cjs/react-router-dom.min";
import {getOneSpotThunk, updateSpotThunk} from "../../store/spotsReducer";
import "./UpdateSpot.css";

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

export default function UpdateSpot() {
  const {spotId} = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const spot = useSelector((state) => state.spots[spotId]);
  console.log("spot to edit", spot);

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId)).then((spot) => {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
    });
  }, [dispatch, spotId]);

  useEffect(() => {
    const errorsObj = {};

    if (!country) errorsObj.country = "Country is required";
    if (!address) errorsObj.address = "Address is required";
    if (!city) errorsObj.city = "City is required";
    if (!state) errorsObj.state = "State is required";
    if (!name) errorsObj.name = "Name is required";
    if (!price) errorsObj.price = "Price is required";

    if (isNaN(price)) errorsObj.price = "Please input a number value";

    if (!lettersOnly(country))
      errorsObj.country = "Please input a valid country";

    if (!usStates.includes(state.toUpperCase()))
      errorsObj.state =
        "Please enter a capitalized valid US State (i.e CA or HI)";

    if (description.length < 30)
      errorsObj.description = "Description needs a minimum of 30 characters";

    if (description.length > 4800)
      errorsObj.description = "Description must be less than 4800 characters";

    if (!usStates.includes(state.toUpperCase()))
      errorsObj.state =
        "Please enter a capitalized valid US State (i.e CA or HI)";
    if (name.length > 50)
      errorsObj.name = "Name must be less than 50 characters";

    setErrors(errorsObj);
  }, [country, address, city, state, name, price, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDidSubmit(true);
    if (Object.keys(errors).length > 0) {
      return alert("Please enter valid information to create your spot.");
    }

    setErrors({});

    const newPrice = fixedPrice(price);

    console.log("this is fixed price", newPrice);

    const updatedSpot = {
      id: spot.id,
      address,
      city,
      state: state.toUpperCase(),
      country,
      lat: 37.76,
      lng: -122.47,
      name,
      description,
      price: newPrice,
    };

    console.log("Updated Spot in COMP", updatedSpot);

    const spotUpdate = await dispatch(updateSpotThunk(updatedSpot));

    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setName("");
    setPrice("");

    if (spotUpdate) history.push(`/spots/${spotUpdate.id}`);
  };

  return (
    <div className="wrapper-div">
      <form className="spot-form" onSubmit={handleSubmit}>
        <div>
          <h2 className="update-head">Update your Spot</h2>
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
        <div className="line"></div>
        <div className="update-btn">
          <button className="spot-button" type="submit">
            Update Your Spot
          </button>
        </div>
      </form>
    </div>
  );
}
