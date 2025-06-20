"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/public/asset/icon.png";
import { RouteStatiData } from "@/app/core/data/appConfig";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import { ModalProps, userType } from "@/app/types/API/index";
import API from "@/app/util/API";
import { useAppDispatch } from "@/app/hooks/dispatch/dispatch";
import { formLogin } from "@/app/types/form";
import Container from "@/app/components/ui/Container";
import TextFieldInput from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import { setCurrentUser } from "@/app/store/reduser/authSlice";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

const LoginChildren: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formLogin, setFormLogin] = useState<formLogin>({
    username: "",
    password: "",
  });

  const [modalData, setModalData] = useState<ModalProps | null>(null);
  const router = useRouter();
  const [showpassword, setShowpassword] = useState<boolean>();
  const [isLoading, setIsloading] = useState<boolean>(true);

  const handleLogin = async () => {
    try {
      if (!formLogin.username || !formLogin.password) {
        setModalData({
          icon: "warning",
          deskripsi: "Mohon Isi Semua Kolom",
          title: "Mohon Isi Semua Kolom",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "Mohon Coba Lagi",
          onClose: () => {
            setModalData(null);
          },
        });
        return;
      }

      const res = await API.post("/api/auth/login", formLogin);
      const userPayload: userType = {
        token: res.data.token,
        user: res.data.user,
      };
      dispatch(setCurrentUser(userPayload));
      let redirectPatch = "/users/home";
      const role = res.data.user.role;

      if (role === "admin") {
        redirectPatch = "/admin/home";
      } else if (role === "owner") {
        redirectPatch = "/owners/home";
      } else if (role === "user") {
        redirectPatch = "/users/home";
      }

      setModalData({
        icon: "success",
        title: "Selamat Datang DiKostHub",
        deskripsi: "Cari KOST Teryamanmu Disini",
        confirmButtonText: "Lanjut",
        confirmButtonColor: "#3572EF",
        onClose: () => {
          setModalData(null);
          router.push(redirectPatch);
        },
      });
    } catch (err) {
      console.log(`Gagal Melakukan Login : ${err}`);
      setModalData({
        icon: "error",
        deskripsi: "Username Dan Kata Sandi Anda Salah",
        title: "Gagal Login",
        confirmButtonColor: "#3572EF",
        confirmButtonText: " Coba Lagi",
        onClose: () => {
          setModalData(null);
        },
      });
    } finally {
      setIsloading(false);
    }
  };

  const handleLoginGoogle = async (e: CredentialResponse) => {
    try {
      setIsloading(true);
      const googleToken = e.credential;
      const res = await API.post("/api/auth/google", { token: googleToken });
      const userPayload: userType = {
        token: res.data.token,
        user: res.data.user,
      };
      dispatch(setCurrentUser(userPayload));

      const role = res.data.user.role;
      const baseUrl = "/home";
      let redirectPatch = "/";
      if (role === "default") {
        redirectPatch = "/auth/lengkapi-data";
      } else if (role === "user") {
        redirectPatch = `/users/${baseUrl}`;
      } else if (role === "admin") {
        redirectPatch = `/admin${baseUrl}`;
      } else if (role === "owner") {
        redirectPatch === `/owners${baseUrl}`;
      }

      setModalData({
        icon: "success",
        title: "Selamat Datang DiKostHub",
        deskripsi: "Cari KOST Teryamanmu Disini",
        confirmButtonText: "Lanjut",
        confirmButtonColor: "#3572EF",
        onClose: () => {
          setModalData(null);
          router.push(redirectPatch);
        },
      });
    } catch (error) {
      console.log("Gagal Melakukan Login Menggunakan Goggle", error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setIsloading(false);
    }, 2000);
    return () => clearTimeout(time);
  }, []);

  return (
    <Container className="w-screen h-screen flex justify-center items-center rounded-tl-lg">
      {isLoading ? (
        <Container className="flex-col ">
          <Container className="flex justify-center items-center h-screen w-full gap-2">
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105"></div>
            <p className="text-[2rem] font-light">Loading...</p>
          </Container>
        </Container>
      ) : (
        <Container className="grid grid-cols-[2fr_1fr] grid-rows-1 gap-4">
          <Container className="flex justify-center items-center">
            <Container className="w-full max-w-lg mx-auto p-6">
              <Container className="flex justify-center py-4">
                <h1 className="text-4xl font-bold text-[4rem]">Masuk</h1>
              </Container>

              <Container className="w-full max-w-md ">
                <GoogleOAuthProvider
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
                >
                  <GoogleLogin
                    onSuccess={(e) => handleLoginGoogle(e)}
                    onError={() =>
                      console.log("Gagal Melakukan Login Menggunakan Google")
                    }
                  />
                </GoogleOAuthProvider>
              </Container>

              <Container className="text-center py-2">
                <p className="text-gray-600">
                  Masukkan Username dan Password Untuk Masuk
                </p>
              </Container>

              <Container className="w-full max-w-md space-y-4">
                <Container>
                  <TextFieldInput
                    label="Username"
                    name={formLogin.username}
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                    value={formLogin.username}
                    onChange={(e) =>
                      setFormLogin((prev) => {
                        const newObj = { ...prev, username: e.target.value };
                        return newObj;
                      })
                    }
                    required
                    aria-required="true"
                  />
                </Container>
                <Container>
                  <Container className="relative">
                    <TextFieldInput
                      label="Password"
                      name={formLogin.password}
                      type={showpassword ? "text" : "password"}
                      className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                      value={formLogin.password}
                      onChange={(e) =>
                        setFormLogin((prev) => {
                          const newObj = { ...prev, password: e.target.value };
                          return newObj;
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowpassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                      aria-label={
                        showpassword ? "Hide password" : "Show password"
                      }
                    >
                      {showpassword ? "Hide" : "Show"}
                    </button>
                  </Container>
                </Container>
                <Container className="text-center">
                  <h1 className="">Lupa Password?</h1>
                </Container>
                <Button onClick={() => handleLogin()}>Masuk</Button>
              </Container>
            </Container>
          </Container>
          <Container className="bg-[#3572EF] flex justify-center items-center rounded-l-[10rem] h-[100vh] p-2">
            <Container className="">
              <Container className="flex justify-center">
                <Image
                  className="h-[15vh] w-[8vw]"
                  src={Icon}
                  alt="Logo"
                  height="10"
                  width="100"
                />
              </Container>

              <Container className="flex justify-center pt-[2rem]">
                <h1 className="text-[3rem] font-extrabold text-white">
                  Halo, Teman!
                </h1>
              </Container>

              <Container className="flex justify-center py-[2rem]">
                <p className="text-[2rem] font-light text-white text-center">
                  Daftarkan Dirimu Untuk Menikmati Layanan Kami
                </p>
              </Container>

              <Container className="flex justify-center">
                {RouteStatiData.map((items, key) => (
                  <Link href={items.register.href} key={key}>
                    <ButtonPrimary>{items.register.title}</ButtonPrimary>
                  </Link>
                ))}
              </Container>
              {modalData && <Modal {...modalData} />}
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default LoginChildren;
