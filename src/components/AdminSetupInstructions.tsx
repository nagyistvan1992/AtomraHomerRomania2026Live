import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Copy, ExternalLink, User, Database, Shield } from 'lucide-react';

const AdminSetupInstructions: React.FC = () => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepNumber: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepNumber);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      title: "Access Supabase Dashboard",
      description: "Go to your Supabase project dashboard",
      action: "Open your Supabase project at supabase.com/dashboard",
      icon: ExternalLink
    },
    {
      title: "Navigate to Authentication",
      description: "Go to Authentication → Users in the sidebar",
      action: "Click on 'Authentication' then 'Users'",
      icon: User
    },
    {
      title: "Create Admin User",
      description: "Click 'Add user' and create a new user",
      details: [
        "Email: atomrahomeromania@gmail.com",
        "Password: Istvan1992",
        "Email confirmed: Yes (check the box)"
      ],
      action: "atomrahomeromania@gmail.com",
      icon: User
    },
    {
      title: "Copy User UUID",
      description: "After creating the user, copy their UUID from the users table",
      action: "Copy the UUID from the 'id' column",
      icon: Copy
    },
    {
      title: "Add to Admin Table",
      description: "Go to Table Editor → admin_users and insert a new row",
      details: [
        "user_id: (paste the UUID you copied)",
        "role: admin (this should be the default)"
      ],
      action: "INSERT INTO admin_users (user_id) VALUES ('your-uuid-here');",
      icon: Database
    },
    {
      title: "Verify Setup",
      description: "Return to this login page and try logging in",
      action: "Use the email and password you created",
      icon: CheckCircle
    }
  ];

  return (
    <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-start space-x-3 mb-4">
        <AlertCircle size={24} strokeWidth={1.5} className="text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-blue-800 font-medium mb-2">Admin Setup Required</h4>
          <p className="text-blue-700 text-sm font-light mb-4">
            Follow these steps to set up your admin account in Supabase:
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-100">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full flex-shrink-0">
                <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon size={16} strokeWidth={1.5} className="text-blue-600" />
                  <h5 className="text-blue-800 font-medium text-sm">{step.title}</h5>
                </div>
                
                <p className="text-blue-700 text-sm font-light mb-2">{step.description}</p>
                
                {step.details && (
                  <ul className="list-disc list-inside text-blue-600 text-xs font-light mb-2 ml-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                )}
                
                {step.action && (
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono">
                      {step.action}
                    </code>
                    {(step.action.includes('@') || step.action.includes('INSERT')) && (
                      <button
                        onClick={() => copyToClipboard(step.action, index)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedStep === index ? (
                          <CheckCircle size={14} strokeWidth={1.5} />
                        ) : (
                          <Copy size={14} strokeWidth={1.5} />
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <Shield size={16} strokeWidth={1.5} className="text-green-600" />
          <p className="text-green-700 text-sm font-medium">
            Security Note
          </p>
        </div>
        <p className="text-green-600 text-xs font-light mt-1">
          The admin user will have full access to the admin panel. Make sure to use a strong password and keep the credentials secure.
        </p>
      </div>
    </div>
  );
};

export default AdminSetupInstructions;