import hero from "../assets/images.jpeg";

const Hero = () => {
    return (
        <div>
            <img src={hero} className="w-full max-h-[600px] object-contain" />
        </div>
    );
}

export default Hero;