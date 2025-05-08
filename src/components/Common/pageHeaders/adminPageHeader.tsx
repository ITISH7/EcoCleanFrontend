import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminPageHeader = ({heading="", link="/admindashboard"}) => {
    const navigate = useNavigate();
  return (
    <div className="flex gap-10 mt-10 pl-10">
      <Button
        onClick={() => {
          navigate(link);
        }}
        className="hover:cursor-pointer bg-white text-secondary-green hover:bg-secondary-green hover:text-white border-2 border-secondary-green box-border cursor-pointer text-[16px] "
      >
        {`< Back`}
      </Button>
      <h1 className="text-4xl font-bold ">{heading}</h1>
    </div>
  );
};

export default AdminPageHeader;
