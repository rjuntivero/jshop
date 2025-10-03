import InputField from '../ui/InputField';

export default function AddressForm() {
  return (
    <form action="" className="grid grid-cols-2 gap-2 text-primary-light font-semibold text-sm">
      <InputField label="Country:" id="Country" className="col-span-2" />
      <InputField label="Full Name:" id="name" className="col-span-2" />
      <InputField label="Phone:" id="phone" className="col-span-2" />
      <InputField label="Address Line 1 (or Company Name):" id="address1" className="col-span-2" />
      <InputField label="Address Line 2 (optional):" id="address2" className="col-span-2" />
      <InputField label="Town/City:" id="townOrCity" className="col-span-2" />
      <InputField label="State:" id="State" />
      <InputField label="Zip:" id="Zip" />
    </form>
  );
}
