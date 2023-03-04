import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
export default function PatientCard({
  name,
  dob,
  familyHistory,
  img,
  id,
  eligibility,
}) {
  return (
    <motion.div className="flex w-96 h-30 drop-shadow-sm border-2 m-9 bg-white rounded-xl justify-between items-center p-4"
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      initial={{ opacity: 0.5, scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
    >
      <div>
        <div className="flex flex-col">
          <span className="text-2xl">{name}</span>
          <span className="text-gray-400">{dob}</span>
          <span className="text-gray-400">{familyHistory}</span>
        </div>
        <div>
          <a href={`/patient/${id}`} className="mt-5">
            More Info
          </a>
        </div>
      </div>
      {/* TODO change eligibility to icons */}
      <div className="flex flex-col justify-between h-full ">
        <Image
          src="/../public/favicon.ico"
          width="50"
          height="50"
          alt="patient avatar"
        />
      </div>
    </motion.div>
  );
}
