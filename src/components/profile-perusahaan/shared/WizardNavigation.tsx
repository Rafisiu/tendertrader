import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface WizardNavigationProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSaveDraft: () => Promise<{ success: boolean; message: string }>;
  onSubmit: () => Promise<{ success: boolean; message: string }>;
  isLoading?: boolean;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
  onSaveDraft,
  onSubmit,
  isLoading = false
}) => {
  const { toast } = useToast();

  const handleSaveDraft = async () => {
    const result = await onSaveDraft();
    toast({
      title: result.success ? 'Sukses' : 'Error',
      description: result.message,
      variant: result.success ? 'default' : 'destructive'
    });
  };

  const handleSubmit = async () => {
    const result = await onSubmit();
    toast({
      title: result.success ? 'Sukses' : 'Error',
      description: result.message,
      variant: result.success ? 'default' : 'destructive'
    });
  };

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <div>
        {!isFirstStep && (
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Sebelumnya
          </Button>
        )}
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={handleSaveDraft}
          disabled={isLoading}
        >
          <Save className="h-4 w-4 mr-2" />
          Simpan Sementara
        </Button>

        {isLastStep ? (
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Kirim
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            disabled={isLoading}
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default WizardNavigation;