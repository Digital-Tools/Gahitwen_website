import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Linkedin from '../icons/Linkedin';
import Instagram from '../icons/Instagram';
import XIcon from '../icons/XIcon';
import { SOCIAL_LINKS } from '../../lib/social';

const details = [
  {
    label: 'Address',
    icon: MapPin,
    content: (
      <address className="not-italic">
        The Gahitwen LLC<br />
        131 Continental Dr Ste 305<br />
        Newark, DE 19713, USA
      </address>
    ),
  },
  {
    label: 'Phone',
    icon: Phone,
    content: (
      <a href="tel:+1-302-607-5297" className="hover:text-brown-950">
        +1 (302) 607-5297
      </a>
    ),
  },
  {
    label: 'Email',
    icon: Mail,
    content: (
      <a href="mailto:info@gahitwen.com" className="hover:text-brown-950">
        info@gahitwen.com
      </a>
    ),
  },
  {
    label: 'Business Hours',
    icon: Clock,
    content: (
      <>
        Monday - Friday: 9:00 AM - 5:00 PM EST<br />
        Weekends: Closed
      </>
    ),
  },
];

const socials = [
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: Instagram },
  { href: SOCIAL_LINKS.x, label: 'X', Icon: XIcon },
];

const ContactInfo = () => {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-brown-950 p-8 text-white md:p-10">
      <div className="absolute inset-0 -z-10 bg-grid-dark mask-fade-b" aria-hidden="true" />

      <h2 className="text-2xl text-white">Contact information</h2>
      <p className="mt-2 text-white/55">Prefer email or a call? Reach us directly.</p>

      <dl className="mt-8 space-y-6">
        {details.map(({ label, icon: Icon, content }) => (
          <div key={label} className="flex items-start gap-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-yellow-400">
              <Icon size={18} />
            </span>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/40">{label}</dt>
              <dd className="mt-1 leading-relaxed text-white/80">{content}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-10 border-t border-white/10 pt-6">
        <p className="text-sm text-white/55">Follow us for the latest news, product updates, and insights.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-sm text-white/70 transition-colors hover:border-yellow-500/60 hover:text-yellow-400"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
