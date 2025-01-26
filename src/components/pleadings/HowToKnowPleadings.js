import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

const InformativeWebsite = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="bg-gray-900 text-white h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8 py-12">
        {/* Intro Section */}
        <section>
          <h1 className="text-4xl font-bold mb-4">How do you know if the customer, Pleadings can be performed.</h1>
          <p className="text-lg text-gray-300">
           
          </p>
        </section>

        {/* Details Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4"></h2>
          <p className="text-lg text-gray-300">
          First we have to confirm that the customer's NTA is his. This can be done by looking at the <strong>File No: </strong> 
          at the top, where the client's A# appears, if these match, we can continue.
          </p>
        </section>
      {/* Image Section */}
      <section>
          <img
            src="https://i.postimg.cc/SRvKjFx0/474264843-616102407629949-2497986332019055160-n.png"
            alt="Example of pleadings uploaded."
            className="w-full rounded-lg shadow-md"
          />
          <p className="text-sm text-gray-400 mt-2 text-center">
          </p>
        </section>

        {/* Additional Info Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Is the respondent dated or not?</h2>
          <p className="text-lg text-gray-300">
          To find out if the respondent needs NTA or not, we have to look at the last part of the first page. If the client has  
          <strong> “a date to be set”</strong> instead of a date, PLEADINGS CANNOT BE DRAFT, because of a defective NTA.
          </p>
          <br />
          {/* Image Section */}
      <section>
          <p className="text-2xl font-bold mb-4">Example of defective NTA</p>
          <img
            src="https://i.postimg.cc/Jz6WLc0g/473709358-962166855839729-7612168824661182727-n.png"
            alt="Example of pleadings uploaded."
            className="w-full rounded-lg shadow-md"
          />
          <p className="text-sm text-gray-400 mt-2 text-center">
          </p>
        </section>
        <br></br>
        {/* Image Section */}
      <section>
          <p className="text-2xl font-bold mb-4">Example of NTA Not defective</p>
          <img
            src="https://i.postimg.cc/NfjJchXs/474221118-975732597216997-5812637052126805970-n.png"
            alt="Example of pleadings uploaded."
            className="w-full rounded-lg shadow-md"
          />
          <p className="text-sm text-gray-400 mt-2 text-center">
          </p>
        </section>

        <br></br>
        <h2 className="text-2xl font-bold mb-4">Identify the information of the pleadings.</h2>
        
          <p className="text-lg text-gray-300 mt-4">
          In the pleadings we have 4 to 6 points, we will see one by one and learn how to identify them. First we have to know what they 
          look like <i>(see reference image)</i>. But there are almost always 4 points and they are the following:
          </p>
        </section>

        {/* Image Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Pleadings points.</h2>
          <img
            src="https://i.postimg.cc/RVw164HQ/473376694-588980147288376-6642746975381698373-n.png"
            alt="Imagen Ilustrativa"
            className="w-full rounded-lg shadow-md"
          />
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Explanation point #1</h2>
          <p className="text-lg text-gray-300">
          In the first point it says, are you a citizen or national of the United States, 
          we can know this in two ways by checking the i-589, or the respondent's birth certificate. 
          If you are not a resident or citizen, we can continue.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Explanation point #2</h2>
          <p className="text-lg text-gray-300">
          Point 2, is similar to the first one, we have to see the birth certificate of the client, if the client is 
          originally from the place where the NTA says in point 2 we can continue.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Explanation point #3</h2>
          <p className="text-lg text-gray-300">
          First we have to compare the NTA with the I-589, if the place of entry matches the NTA, it is fine, 
          but if the date does not match, we have a problem:<br></br><br></br>
            1. If the entry date does not match for more than 1 week, it has to be modified, <strong><i>you can see this topic in drafting pleadings”.</i></strong><br></br><br></br>
            2. If the place of entry does not match, we have 2 options, we put the one that appears in the i-589 (it is the most reliable) or we can ask the secretary to confirm with the client, the place of entry. And this has to be modified. You can still see this topic in <strong><i><a>“drafting pleadings”.</a></i></strong>
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Explanation point #4</h2>
          <p className="text-lg text-gray-300">
          To better understand point #4, we need to look at the following images.
          </p>
        </section>
        {/* Image Section */}
        <section>
          <img
            src="https://i.postimg.cc/K8rd56dt/474245319-618677194040777-6239286078534305259-n.png"
            alt="Imagen Ilustrativa"
            className="w-full rounded-lg shadow-md"
          />
        </section>
        {/* Image Section */}
        <section>
          <img
            src="https://i.postimg.cc/6QWFbHXg/474024170-1404514063851133-7345305083423634849-n.png"
            alt="Imagen Ilustrativa"
            className="w-full rounded-lg shadow-md"
          />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Explanation point #4</h2>
          <p className="text-lg text-gray-300">
          As we can see, the points number 4 in the two images are different, this is because one is EWI, and the other is PAROLED. 
          These two dots have to be the same in the I-589 if the text is similar to the first one, in the i-589 it has to say <strong><i>“EWI”. </i></strong>
            If the text is similar to 2, in the I-589 it has to say <strong><i>“Paroled”.</i></strong>
            <br></br>
          </p>
        </section>
         {/* Image Section */}
         <section>
         <h2 className="text-2xl font-bold mb-4">Example I-589</h2>
          <img
            src="https://i.postimg.cc/ZYdsHkN0/474812297-593359370162932-3660400871220718328-n.png"
            alt="Imagen Ilustrativa"
            className="w-full rounded-lg shadow-md"
          />
                   <h2 className="text-2xl font-bold mb-4"></h2>

        </section>
        
      </div>
    </div>
  );
};

export default InformativeWebsite;