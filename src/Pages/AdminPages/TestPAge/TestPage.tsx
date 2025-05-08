import CommonModalCard, { ModalRef } from "@/components/Common/ModalCards/commonModalCard"
import AdminPageHeader from "@/components/Common/pageHeaders/adminPageHeader"
import { Button } from "@/components/ui/button"
import { modalContent } from "@/utils/constants/constants"
import { useRef } from "react"

const TestPage = () => {
    const modalref = useRef<ModalRef>(null)
    const confirmFilter=()=>{

    }
    const handleOpenCard=()=>{
        modalref.current?.openModal()
    }
    
  return (
    <div className="m-20 h-full w-full">
        <AdminPageHeader heading="Testing Page" />
        <Button className="" onClick={handleOpenCard}> OpenCard</Button>
        <CommonModalCard ref={modalref} title={modalContent.deletejunkitem.title} description={modalContent.deletejunkitem.description} isDelete={true}>
                <Button
                className="bg-secondary-green text-white w-[45%] hover:bg-primary-green"
                onClick={confirmFilter}
                >
                Confirm
                </Button>
        </CommonModalCard>
    </div>
  )
}

export default TestPage