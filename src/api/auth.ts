import axiosInstance from '.';

interface Payload {
  [key: string]: any;
}

const signUpApi = async ({ payload }: Payload) => {
  try {
    const res = await axiosInstance.post(
      `/api-gateway/api/v1/auth/sign-up`,
      payload
    );
    return res;
  } catch (error) {
    console.warn(error);
  }
};

const verifyEmail = async ({ payload }: any) => {
  try {
    const res = await axiosInstance.post(
      `/api-gateway/api/v1/auth/verify-email`,
      payload
    );
    return res;
  } catch (error) {
    console.warn(error);
  }
};

const signInApi = async ({ payload }: any) => {
  try {
    const res = await axiosInstance.post(
      `/api-gateway/api/v1/auth/sign-in`,
      payload
    );
    return res;
  } catch (error) {
    console.warn(error);
  }
};

export { signUpApi, signInApi, verifyEmail };
