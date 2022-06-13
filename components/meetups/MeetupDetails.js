import classes from './MeetupDetails.module.css';

const MeetupDetails = (props) => {
    console.log(props.description);
    return (
        <section className={classes.container}>
            {/* <Image
                width="200 rem"
                height="300 rem"
                layout="intrinsic"
                src={props.image}
                alt="place_image"
            /> */}
            <img src={props.image} alt="meeting_image" />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    );
};

export default MeetupDetails;
