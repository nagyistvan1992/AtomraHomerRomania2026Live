import { Navigate, useParams } from 'react-router-dom';
import { resolveLegacyProductSlug } from '../utils/legacyProductRoutes';

const LegacyProductRoute = () => {
  const { legacySlug } = useParams<{ legacySlug: string }>();
  const resolvedSlug = resolveLegacyProductSlug(legacySlug);

  if (!resolvedSlug) {
    return <Navigate to="/toate-produsele" replace />;
  }

  return <Navigate to={`/product/${resolvedSlug}`} replace />;
};

export default LegacyProductRoute;
