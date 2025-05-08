const TermsAndConditions: React.FC = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen mt-22 bg-gray-100 p-6">
        <div className="w-2/3 py-6 flex justify-center bg-[#48872C] rounded-lg shadow-lg">
          <p className="text-white text-4xl font-bold">Terms & Conditions</p>
        </div>
  
          <div className="w-2/3 mt-6 p-6 bg-white shadow-md rounded-lg">
          <p className="text-black text-lg leading-relaxed">
            Welcome to EcoClean!
          </p>
          <p className="text-black text-lg leading-relaxed mt-4">
            These terms and conditions outline the rules and regulations for the use of the EcoClean Website.
          </p>
          <p className="text-black text-lg leading-relaxed mt-4">
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use EcoClean if you do not agree to take all of the terms and conditions stated on this page.
          </p>
  
          <h1 className="text-[#48872C] text-2xl font-bold mt-6">Cookies</h1>
          <p className="text-black text-lg leading-relaxed mt-2">
            We employ the use of cookies. By accessing EcoClean, you agree to use cookies in agreement with the EcoClean’s Privacy Policy.
          </p>
  
          <h1 className="text-[#48872C] text-2xl font-bold mt-6">License</h1>
          <p className="text-black text-lg leading-relaxed mt-2">
            Unless otherwise stated, EcoClean and/or its licensors own the intellectual property rights for all material on EcoClean. All intellectual property rights are reserved.
          </p>
          <ul className="list-disc list-inside text-black text-lg mt-2">
            <li>Republish material from EcoClean</li>
            <li>Sell, rent, or sub-license material from EcoClean</li>
            <li>Reproduce, duplicate, or copy material from EcoClean</li>
            <li>Redistribute content from EcoClean</li>
          </ul>
  
          <h1 className="text-[#48872C] text-2xl font-bold mt-6">Hyperlinking to our Content</h1>
          <p className="text-black text-lg leading-relaxed mt-2">
            The following organizations may link to our Website without prior written approval:
          </p>
          <ul className="list-disc list-inside text-black text-lg mt-2">
            <li>Government agencies</li>
            <li>Search engines</li>
            <li>News organizations</li>
            <li>Online directory distributors</li>
          </ul>
  
          <h1 className="text-[#48872C] text-2xl font-bold mt-6">iFrames</h1>
          <p className="text-black text-lg leading-relaxed mt-2">
            Without prior approval and written permission, you may not create frames around our webpages that alter in any way the visual presentation or appearance of our Website.
          </p>
  
          <h1 className="text-[#48872C] text-2xl font-bold mt-6">Disclaimer</h1>
          <p className="text-black text-lg leading-relaxed mt-2">
            The Company, along with related parties, cannot be held responsible for any damages arising from the use or inability to use the site and its materials.
          </p>
        </div>
      </div>
    );
  };
  
  export default TermsAndConditions;

  