import React, { useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import ThreeDots from '../../utils/three-dots';
import { Edit, Trash, ArchiveIcon } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import EditLinkModal from '../modals/edit-link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signalIframe } from '@/utils/helpers';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import CustomAlert from '../alerts/custom-alert';
import useMediaQuery from '@/hooks/use-media-query';
import PopoverMobile from './popover-mobile';
import { Drawer } from 'vaul';

const PopoverDesktop = ({ id, title, url, archived }) => {
  const [isArchived, setIsArchived] = useState(archived);
  const [openPopover, setOpenPopover] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const userId = currentUser?.id ?? null;

  const { isMobile } = useMediaQuery();

  const archiveMutation = useMutation(
    async () => {
      await axios.patch(`/api/links/${id}`, { archived: !isArchived });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['links', userId] });
        signalIframe();
      },
    }
  );

  const handleToggleArchiving = async () => {
    setOpenPopover(false);
    setOpenDrawer(false);
    await toast.promise(archiveMutation.mutateAsync(), {
      loading: 'Değişiklikler uygulanıyor...',
      success: 'Değişiklikler Uygulandı!',
      error: 'An error occured',
    });
    setIsArchived(!isArchived);
  };

  const deleteMutation = useMutation(
    async () => {
      await axios.delete(`/api/links/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['links', userId] });
        signalIframe();
      },
    }
  );

  const handleDeleteLink = async () => {
    setOpenPopover(false);
    setOpenDrawer(false);
    await toast.promise(deleteMutation.mutateAsync(), {
      loading: 'Link Siliniyor...',
      success: 'Link başarıyla silindi!',
      error: 'An error occured',
    });
  };

  const closePopOver = () => {
    setOpenPopover(false);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const deleteAlertProps = {
    action: handleDeleteLink,
    title: 'Linki Sil?',
    desc: 'Linki silmek istediğinizden emin misiniz? bu işlem geri alınamaz.',
    confirmMsg: 'Evet, sil gitsin.',
    close: (!openPopover && closeDrawer) || (!openDrawer && closePopOver),
  };

  const archiveProps = {
    action: handleToggleArchiving,
    title: !isArchived ? 'Linki Arşivle?' : 'Linki Arşivden Çıkar?',
    desc: !isArchived
      ? "Arşivlenen bağlantılar çalışmaya devam edecek; yalnızca ana sayfanızda görünmeyecekler."
      : 'Bu bağlantıyı arşivden çıkardığınızda ana sayfanızda tekrar görünecektir.',
    confirmMsg: !isArchived ? 'Evet, Arşivle' : 'Evet, Arşivden Çıkar',
    close: (!openPopover && closeDrawer) || (!openDrawer && closePopOver),
  };

  const mobilePopOverProps = {
    archiveProps,
    deleteAlertProps,
    title,
    id,
    url,
    archived,
    isArchived,
    closeDrawer,
  };

  return (
    <PopoverPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
      {isMobile ? (
        <Drawer.Root
          open={openDrawer}
          onOpenChange={setOpenDrawer}
          shouldScaleBackground
        >
          <Drawer.Trigger>
            <ThreeDots />
          </Drawer.Trigger>
          <PopoverMobile {...mobilePopOverProps} />
        </Drawer.Root>
      ) : (
        <PopoverPrimitive.Trigger className="">
          <ThreeDots />
        </PopoverPrimitive.Trigger>
      )}
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="w-[120px] items-center rounded-md border border-gray-200 mr-2 bg-white drop-shadow-lg md:block lg:w-[150px]"
          sideOffset={4}
        >
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100">
                <h4>Düzenle</h4>
                <Edit size={17} color="gray" />
              </button>
            </Dialog.Trigger>
            <EditLinkModal
              close={closePopOver}
              id={id}
              title={title}
              url={url}
            />
          </Dialog.Root>
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100">
                <h4>{!isArchived ? 'Arşivle' : 'Arşivden Çıkar'}</h4>
                <ArchiveIcon size={17} color="gray" />
              </button>
            </AlertDialog.Trigger>
            <CustomAlert {...archiveProps} />
          </AlertDialog.Root>
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-red-400 transition-all duration-75 hover:bg-red-500 hover:text-white">
                <h4>Sil</h4>
                <Trash size={17} className="text-b-400 hover:text-white" />
              </button>
            </AlertDialog.Trigger>
            <CustomAlert {...deleteAlertProps} />
          </AlertDialog.Root>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export default PopoverDesktop;
