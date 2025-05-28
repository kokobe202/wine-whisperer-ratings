
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface Wine {
  id: number;
  name: string;
  type: string;
  vintage: string;
  region: string;
  winery: string;
  rating: number;
  price: string;
  image: string;
  isFavorite: boolean;
  tastingDate: string;
  notes: string;
}

interface WineRemovalDialogProps {
  isOpen: boolean;
  wine: Wine | null;
  removalReason: string;
  removalReasons: { value: string; label: string }[];
  onConfirm: () => void;
  onCancel: () => void;
}

const WineRemovalDialog = ({
  isOpen,
  wine,
  removalReason,
  removalReasons,
  onConfirm,
  onCancel
}: WineRemovalDialogProps) => {
  const { t } = useLanguage();

  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('wine.confirmRemoval')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('wine.confirmRemovalText')} "{wine?.name}" de votre cave ?
            <br />
            <span className="font-medium">
              {t('wine.reason')} : {removalReasons.find(r => r.value === removalReason)?.label}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {t('wine.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            {t('wine.remove')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WineRemovalDialog;
