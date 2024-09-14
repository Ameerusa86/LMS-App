import React from "react";

const ProfileInfo: React.FC = () => {
  return (
    <section className="flex items-center justify-center min-h-screen py-10 dark:bg-gray-900 bg-gray-100">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-6 rounded-xl bg-white dark:bg-gray-800/80 backdrop-filter backdrop-blur-lg border border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-center lg:text-4xl md:text-3xl sm:text-2xl xs:text-2xl font-serif font-extrabold mb-4 text-gray-900 dark:text-white">
              Profile
            </h1>
            <h2 className="text-center text-gray-600 text-sm mb-6 dark:text-gray-400">
              Create Your Profile
            </h2>
            <form>
              <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-inner mb-6">
                <div className="relative mx-auto w-full h-[200px] bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
                  <div className="relative w-[141px] h-[141px] bg-blue-300/20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <ImageUploadButton />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <CoverUploadButton />
                </div>
              </div>
              <h2 className="text-center mt-4 font-semibold dark:text-gray-300 text-gray-800">
                Upload Profile and Cover Image
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                <InputField
                  label="First Name"
                  placeholder="First Name"
                  type="text"
                />
                <InputField
                  label="Last Name"
                  placeholder="Last Name"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <SelectField label="Sex" options={["Male", "Female"]} />
                <InputField label="Date Of Birth" type="date" />
              </div>
              <div className="w-full mt-6">
                <SubmitButton />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImageUploadButton: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <input type="file" name="profile" id="upload_profile" hidden required />
      <label
        htmlFor="upload_profile"
        className="absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-90"
      >
        <div className="bg-white p-2 rounded-full shadow-lg">
          <svg
            data-slot="icon"
            className="w-6 h-6 text-blue-700"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            ></path>
          </svg>
        </div>
      </label>
    </div>
  );
};

const CoverUploadButton: React.FC = () => {
  return (
    <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 shadow-lg cursor-pointer">
      <input type="file" name="profile" id="upload_cover" hidden required />
      <label
        htmlFor="upload_cover"
        className="flex items-center gap-1 text-blue-700 font-semibold"
      >
        Cover
        <svg
          data-slot="icon"
          className="w-6 h-6 text-blue-700"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
          ></path>
        </svg>
      </label>
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  placeholder?: string;
  type: string;
}> = ({ label, placeholder = "", type }) => {
  return (
    <div className="w-full mb-4">
      <label className="block mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-4 border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const SelectField: React.FC<{ label: string; options: string[] }> = ({
  label,
  options,
}) => {
  return (
    <div className="w-full mb-4">
      <label className="block mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select className="w-full p-4 border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option disabled value="">
          Select {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const SubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition-colors"
    >
      Submit
    </button>
  );
};

export default ProfileInfo;
