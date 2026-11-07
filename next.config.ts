import Inspector from 'interactive-react-inspector';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {};

export default Inspector.next(withNextIntl(nextConfig));
