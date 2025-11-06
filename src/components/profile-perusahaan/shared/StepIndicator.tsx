import React from 'react';
import { Check } from 'lucide-react';
import { WizardStep } from '@/types/wizard';

interface StepIndicatorProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  steps, 
  currentStep, 
  onStepClick 
}) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-13 gap-4">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`flex flex-col items-center text-center ${
              onStepClick ? 'cursor-pointer hover:opacity-80' : ''
            }`}
            onClick={() => onStepClick?.(step.id)}
          >
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors mb-2
                ${step.isCompleted 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : step.isActive 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }
              `}
            >
              {step.isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                step.id
              )}
            </div>
            <div className="text-xs font-medium text-center">
              {step.title}
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 12) * 100}%` }}
        />
      </div>
      
      <div className="text-center mt-2 text-sm text-gray-600">
        Step {currentStep} of 12
      </div>
    </div>
  );
};

export default StepIndicator;