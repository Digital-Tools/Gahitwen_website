import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { Linkedin, Twitter } from 'lucide-react';

type TeamMemberProps = {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
  twitter?: string;
};

const TeamMember = ({ name, title, bio, imageUrl, linkedin, twitter }: TeamMemberProps) => {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-brown-900 mb-1">{name}</h3>
        <p className="text-yellow-600 font-medium mb-3">{title}</p>
        <p className="text-gray-600 mb-4">{bio}</p>
        
        {(linkedin || twitter) && (
          <div className="flex space-x-3">
            {linkedin && (
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brown-900 transition-colors"
              >
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
            {twitter && (
              <a 
                href={twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brown-900 transition-colors"
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default TeamMember;