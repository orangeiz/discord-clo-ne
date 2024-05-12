"use client";
import { Dialog, DialogContent,   DialogDescription,   DialogFooter,   DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export const DeleteServerModal=()=>{
    const router=useRouter();
   const {isOpen,onClose,type,data}=useModal();
    const isModalOpen=isOpen&&type==="deleteServer";
    const {server}=data;
    const[isLoading,setIsLoading]=useState(false);
    const onClick=async()=>{
        try{
        setIsLoading(true);
        await axios.delete(`/api/servers/${server?.id}`);
        onClose();
        router.refresh();
        }
        catch(error){
        console.log(error);
        }
        finally{
        setIsLoading(false);
        }
    }
    
   
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center  font-bold">
                        Delete Server
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure want to do this?
                        <span className=" text-indigo-500 font-semibold">  {server?.name} </span> will be permanently  deleleted
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} variant="ghost" 
                        onClick={onClose}>Cancel</Button>
                        <Button disabled={isLoading} variant="primary" 
                        onClick={onClick}>Confirm</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}