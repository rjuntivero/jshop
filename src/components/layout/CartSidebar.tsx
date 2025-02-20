import Button from '../ui/Button'
interface SidebarProps {
  onClose: () => void
  className?: string
}

const CartSidebar: React.FC<SidebarProps> = ({ onClose, className }) => {
  return (
    <>
      <main className={className + ' *:font-sub-header overflow-y-auto'}>
        <div className="mb-4 w-full border-b-3 pb-2">
          <h1 className="font-big-header text-primary-light self-center justify-self-center text-3xl">
            My Cart
          </h1>
        </div>
        <div className="w-full grow rounded-lg p-6 shadow-2xl">
          <div className="pb-2">
            <img
              className="outline-primary-light rounded-sm object-contain outline-2"
              src="../public/images/mock.jpg"
              alt="Product Image"
            />
          </div>
          <div>
            <h1 className="-mb-2 text-xl">Your Item</h1>
          </div>
          <div className="text-secondary-light font-main pb-2">
            <h2>Item Type</h2>
          </div>
          <div className="bg-primary-light flex rounded-sm p-2 text-white">
            <Button className="ml-auto">Add More</Button>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="bg-secondary-light z-40 mt-4 flex items-center justify-center rounded-sm p-4 text-black"
        >
          Close
        </Button>
      </main>
    </>
  )
}

export default CartSidebar
