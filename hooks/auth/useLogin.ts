import { AuthService, LoginPayload } from "@/services/auth/auth.service"
import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export const useLogin = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return useMutation({
        mutationFn: (payload: LoginPayload) => AuthService.login(payload),
        onMutate: () => {
            toast.loading("Đang đăng nhập...");
        },
        onSuccess: async (data) => {
            toast.dismiss();

            // lưu token và thông tin user
            AuthService.setToken(data.token, data.fullName, data.email);
            toast.success("Đăng nhập thành công!");

            // redirect url
            const callbackUrl = searchParams.get('callbackUrl');
            const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl) : '/dashboard';

            setTimeout(() => {
                router.push(redirectUrl);
            }, 1000);
        },
        onError: (error) => {
            toast.dismiss();
            toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
            console.error("Login error:", error);
        }
    })
}