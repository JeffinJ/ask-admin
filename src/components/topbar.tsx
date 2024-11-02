import { Session } from "next-auth";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";

type TopBarProps = {
    session: Session | null;
};

export default function TopBar({ session }: TopBarProps) {
    const image = session?.user.image || '/avatar-placeholder.png';

    return (
        <div className="text-white w-full flex flex-row items-center justify-between px-5 py-3">
            <div>
                <Image src="/assets/images/logo.svg" alt="Logo" width={50} height={50} />
            </div>
            <div>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={image} alt={'UserImage'} />
                </Avatar>
            </div>
        </div>
    )
};