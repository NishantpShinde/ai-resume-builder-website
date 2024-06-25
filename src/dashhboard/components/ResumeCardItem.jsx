import { Loader2, Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "./../../../services/GlobalApi";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.id).then(
      (resp) => {
        console.log("Deleted:", resp);
        toast("Resume Deleted !");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const onRename = () => {
    setLoading(true);
    const data = {
      data: {
        title: title,
      },
    };
    GlobalApi.UpdateResumeDetail(resume.id, data).then(
      (resp) => {
        console.log("Rename: ", resp);
        toast("Title Changed Successfully !");
        setLoading(false);
        refreshData();
        setOpenDialog(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="">
      <Link to={"/dashboard/resume/" + resume.id + "/edit"}>
        <div
          className="p-14  bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] 
          rounded-t-lg border-t-4
        "
          style={{
            borderColor: resume?.attributes?.themeColor,
          }}
        >
          <div
            className="flex 
        items-center justify-center h-[180px] "
          >
            {/* <Notebook/> */}
            <img src="/cv.png" width={80} height={80} />
          </div>
        </div>
      </Link>

      <div
        className="border p-3 flex justify-between  text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.attributes?.themeColor,
        }}
      >
        <h2 className="text-sm">{resume?.attributes?.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setOpenDialog(true)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + resume.id + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation("/my-resume/" + resume.id + "/view")}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation("/my-resume/" + resume.id + "/view")}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

       
      </div>
          <Dialog open={openDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename title</DialogTitle>
                <DialogDescription>
                  <p>Add a title for your resume</p>
                  <Input
                    className="my-2"
                    placeholder="Ex.Full Stack resume"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </DialogDescription>
                <div className="flex justify-end gap-5">
                  <Button onClick={() => setOpenDialog(false)} variant="ghost">
                    Cancel
                  </Button>
                  <Button
                    disabled={!title || loading}
                    onClick={() => onRename()}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Create"}
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
    </div>
  );
}

export default ResumeCardItem;
