import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />
          )}
          {item.active ? (
            <span className="text-gray-500">{item.label}</span>
          ) : (
            <Link
              to={item.href}
              className="text-gray-600 hover:text-primary"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}; 