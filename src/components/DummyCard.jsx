import dummy from "../assets/dummy.jpeg";

const DummyCard = ({position}) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-md shadow h-[250px] w-[250px]">
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <img
          src={dummy}
          alt="Member"
          className="h-[120px] w-[120px] sm:h-24 sm:w-24 rounded-full object-cover"
        />
        <div className="text-center">
          <p className="text-base sm:text-lg font-medium capitalize">
            Member Name
          </p>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default DummyCard;
