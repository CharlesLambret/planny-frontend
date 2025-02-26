import React, { useEffect, useState } from 'react';





import { JSX } from 'react';

import MainButton from '@/components/commons/misc/mainbutton';

interface TemplateDetailProps {
    entry:{
        name : string,
        divcontent1 : string,
        divcontent2 : string,
        image_path : string,
        section1? : JSX.Element,
        section2? : JSX.Element,
        section3? : JSX.Element,
        section3Title? : string,
        section4? : JSX.Element,
        section4Title? : string,
    }
    handleEditClick: () => void
    category: 'ingredient' | 'recette' | 'menu'
}

const TemplateDetail: React.FC<TemplateDetailProps> = ({ entry, handleEditClick, category }) => {

    let editButtontext 
    if (category === 'ingredient') {
        editButtontext = 'Modifier l\'ingrédient'
    } else if (category === 'recette') {
        editButtontext = 'Modifier la recette'
    } else  {
        editButtontext = 'Modifier le menu'
    }

 
    if (!entry) {
        return <div>Loading...</div>;
      }



  return (

    <div className="flex mx-auto flex-col ">
            <div className="w-full flex justify-end">
            <MainButton
                onClick={handleEditClick}
                className="m-3"
                loading={false}
                mainButtonText={editButtontext}
            />
            </div>
            <div
            className="relative w-full mx-auto flex flex-col p-4 justify-end text-white h-2/3 rounded-lg font-bold bg-cover bg-center"
            style={
                    {
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/${entry.image_path})`
                    }}
            >
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>

            <h1 className="relative py-5 text-3xl font-bold ">{entry.name}</h1>
            <p className="relative py-5 text-md ">{entry.divcontent1}</p>
            <p className="relative py-5 text-md ">{entry.divcontent2}</p>
            </div>
            {entry.section1 && (
                <>
                    <div className="flex flex-row flex-wrap w-full justify-start space-between">
                        {entry.section1}
                    </div>
                    <hr className="my-4 w-full border-gray-300" />
                </>
            )}
            {entry.section2 && (
                <>
                    <div className="flex flex-row flex-wrap w-full justify-start space-between">
                        {entry.section2}
                    </div>
                    <hr className="my-4 w-full border-gray-300" />
                </>
            )}
            {entry.section3 && (

                <div className="flex flex-col p-3">
                    <h2 className="text-2xl font-bold">{entry.section3Title}</h2>
                    <ul className="list-disc list-inside">
                    <div className="flex  p-2 flew-row flex-wrap w-full justify-start space-between">
                                {entry.section3}
                        </div>
                    </ul>
                </div>

            )}
            {entry.section4 && (

                <div className="flex flex-col p-3">
                    <h2 className="text-2xl font-bold">{entry.section4Title}</h2>
                    {entry.section4}
                </div>

            )}
        </div>
       
  );
};

export default TemplateDetail;