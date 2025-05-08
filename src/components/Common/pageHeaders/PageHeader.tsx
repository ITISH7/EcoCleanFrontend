import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PageHeader = ({heading=""}) => {
    const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 pl-10 mt-10">Dashboard/{heading}:</h1>
      <Button
        onClick={() => {
          navigate("/dashboard");
        }}
        className="bg-white box-border border-2 border-secondary-green cursor-pointer text-secondary-green mx-4 mt-4 text-[16px] ml-10 hover:bg-gray-100"
      >
        {`< Back`}
      </Button>
    </div>
  );
};

export default PageHeader;
