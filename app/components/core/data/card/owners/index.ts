import { useAppSelector } from "../../../hooks/dispatch/dispatch";
import { ownerProfileConfig } from "@/app/components/types/components";
import API from "../../../util/API";
import { useState, useEffect } from "react";
import { ProfileType } from "@/app/components/types/API";

export const useOwnerProfileConfigData = (): ownerProfileConfig[] => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [profileData, setProfileData] = useState<ProfileType>();

  const handleGetProfile = async () => {
    try {
      const res = await API.get(
        `/api/auth/getProfile/${currentUser?.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      setProfileData(res.data.data);
    } catch (error) {
      console.log(`Gagal fetch Data User ${error}`);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      handleGetProfile();
    }, 1000);
    return () => clearTimeout(time);
  }, []);

  return [
    {
      foto: {
        image: profileData?.fotoProfil,
        username: profileData?.username,
      },
      detail: [
        {
          label: "Nama :",
          datas: profileData?.fullname,
        },
        {
          label: "Alamat :",
          datas: profileData?.alamat,
        },
        {
          label: "Email:",
          datas: profileData?.email,
        },
        {
          label: "Nomor Telp:",
          datas: profileData?.nomor,
        },
      ],
    },
  ];
};
