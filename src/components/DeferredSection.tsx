import React, { useEffect, useRef, useState, type ReactNode } from 'react';

interface DeferredSectionProps {
  children: ReactNode;
  className?: string;
  minHeightClassName?: string;
  rootMargin?: string;
}

const DeferredSection = ({
  children,
  className = '',
  minHeightClassName = 'min-h-[480px]',
  rootMargin = '320px 0px'
}: DeferredSectionProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <section ref={sectionRef} className={`deferred-visibility ${className}`}>
      {shouldRender ? (
        children
      ) : (
        <div className={`${minHeightClassName} animate-pulse bg-gradient-to-b from-slate-50/70 via-white to-slate-50/70`} />
      )}
    </section>
  );
};

export default DeferredSection;
