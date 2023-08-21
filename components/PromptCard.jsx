"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const [copied, setCopied] = useState("");

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 3000)
    }

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-52">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">
                    <Image
                        src={post.author.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />

                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">{post.author.username}</h3>
                        <p className="font-inter text-sm text-gray-500">{post.author.email}</p>
                    </div>
                </div>

                <div className="copy_btn"
                    onClick={handleCopy}
                >
                    <Image src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
                        alt="Copy"
                        width={12}
                        height={12}
                    />

                </div>

            </div>

            <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
            <p className="blue_gradient text-sm font-inter cursor-pointer"
                onClick={() => handleTagClick && handleTagClick}

            >{post.tag}
            </p>


            {session?.user.id === post.author._id && pathName === '/profile' && (
                <div className="mt-5  flex-center gap-4 border-t border-gray-100 pt-3 ">
                    <p className="font-inter green-gardient text-sm cursor-pointer"
                        onClick={handleEdit}
                    >Edit</p>
                    <p className="font-inter orange-gardient text-sm cursor-pointer"
                        onClick={handleDelete}
                    >Delete</p>
                </div>
            )}
        </div>
    )
}

export default PromptCard;