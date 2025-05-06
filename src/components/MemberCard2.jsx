import dummy from "../assets/dummy.jpeg";

const MemberCard2 = ({ member }) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-md shadow h-[250px] w-[300px]`}
    >
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <img
          src={member.profileImg || dummy}
          alt="Member Name"
          className="h-[120px] w-[120px] rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-medium capitalize">{member.name}</p>
          <p className="text-sm text-gray-500 capitalize">{member.position}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard2;
