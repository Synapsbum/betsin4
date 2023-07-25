import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import ThreeDots from "./three-dots";
import { Edit, Trash, ArchiveIcon } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import EditLinkModal from "../shared/modals/edit-link";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signalIframe } from "@/utils/helpers";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import CustomAlert from "../shared/alerts/custom-alert";
import useWindowSize from "@/hooks/use-window-size";
import PopoverMobile from "./popover-mobile";
import { Drawer } from "vaul";

const InfoPopover = ({ id, title, url, archived }) => {
	const [isArchived, setIsArchived] = useState(archived);

	const { data: currentUser } = useCurrentUser();
	const queryClient = useQueryClient();
	const userId = currentUser?.id ?? null;

	const { width } = useWindowSize();

	const archiveMutation = useMutation(
		async () => {
			await axios.patch(`/api/links/${id}`, { archived: !isArchived });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["links", userId] });
				signalIframe();
			},
		}
	);

	const handleToggleArchiving = async () => {
		await toast.promise(archiveMutation.mutateAsync(), {
			loading: "Applying changes",
			success: "Changes applied successfully",
			error: "An error occured",
		});
		setIsArchived(!isArchived);
	};

	// delete link
	const deleteMutation = useMutation(
		async () => {
			await axios.delete(`/api/links/${id}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["links", userId] });
				signalIframe();
			},
		}
	);

	const handleDeleteLink = async () => {
		await toast.promise(deleteMutation.mutateAsync(), {
			loading: "Deleting link",
			success: "Link deleted successfully",
			error: "An error occured",
		});
	};

	const deleteAlertProps = {
		action: handleDeleteLink,
		title: "Delete Link?",
		desc: "Are you sure you want to delete this link? This action cannot be undone.",
		confirmMsg: "Yes, delete link",
	};

	const archiveProps = {
		action: handleToggleArchiving,
		title: !isArchived ? "Archive Link?" : "Unarchive Link?",
		desc: !isArchived
			? "Archived links will still work - they just won't show up on your main page."
			: "By unarchiving this link, it will show up on your main page again.",
		confirmMsg: !isArchived ? "Yes, archive" : "Yes, unarchive",
	};

	const mobilePopOverProps = {
		archiveProps,
		deleteAlertProps,
		title,
		id,
		url,
		archived,
		isArchived,
	};

	return (
		<Popover.Root>
			{width > 640 ? (
				<Popover.Trigger className="">
					<ThreeDots />
				</Popover.Trigger>
			) : (
				<Drawer.Root shouldScaleBackground>
					<Drawer.Trigger>
						<ThreeDots />
					</Drawer.Trigger>
					<PopoverMobile {...mobilePopOverProps} />
				</Drawer.Root>
			)}
			<Popover.Portal>
				<Popover.Content
					className="w-[120px] items-center rounded-md border border-gray-200 mr-2 bg-white drop-shadow-lg md:block lg:w-[150px]"
					sideOffset={4}>
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100">
								<h4>Edit</h4>
								<Edit size={17} color="gray" />
							</button>
						</Dialog.Trigger>
						<EditLinkModal id={id} title={title} url={url} />
					</Dialog.Root>
					<AlertDialog.Root>
						<AlertDialog.Trigger asChild>
							<button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100">
								<h4>{!isArchived ? "Archive" : "Unarchive"}</h4>
								<ArchiveIcon size={17} color="gray" />
							</button>
						</AlertDialog.Trigger>
						<CustomAlert {...archiveProps} />
					</AlertDialog.Root>
					<AlertDialog.Root>
						<AlertDialog.Trigger asChild>
							<button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-red-400 transition-all duration-75 hover:bg-red-500 hover:text-white">
								<h4>Delete</h4>
								<Trash
									size={17}
									className="text-b-400 hover:text-white"
								/>
							</button>
						</AlertDialog.Trigger>
						<CustomAlert {...deleteAlertProps} />
					</AlertDialog.Root>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};

export default InfoPopover;
