-- DropForeignKey
ALTER TABLE "cells" DROP CONSTRAINT "cells_leader_id_fkey";

-- DropForeignKey
ALTER TABLE "cells" DROP CONSTRAINT "cells_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "disciplers" DROP CONSTRAINT "disciplers_shepherd_id_fkey";

-- DropForeignKey
ALTER TABLE "disciplers" DROP CONSTRAINT "disciplers_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "leaders" DROP CONSTRAINT "leaders_discipler_id_fkey";

-- DropForeignKey
ALTER TABLE "leaders" DROP CONSTRAINT "leaders_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_cell_id_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "shepherds" DROP CONSTRAINT "shepherds_tenant_id_fkey";

-- AddForeignKey
ALTER TABLE "shepherds" ADD CONSTRAINT "shepherds_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplers" ADD CONSTRAINT "disciplers_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplers" ADD CONSTRAINT "disciplers_shepherd_id_fkey" FOREIGN KEY ("shepherd_id") REFERENCES "shepherds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaders" ADD CONSTRAINT "leaders_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaders" ADD CONSTRAINT "leaders_discipler_id_fkey" FOREIGN KEY ("discipler_id") REFERENCES "disciplers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cells" ADD CONSTRAINT "cells_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cells" ADD CONSTRAINT "cells_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "leaders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_cell_id_fkey" FOREIGN KEY ("cell_id") REFERENCES "cells"("id") ON DELETE CASCADE ON UPDATE CASCADE;
