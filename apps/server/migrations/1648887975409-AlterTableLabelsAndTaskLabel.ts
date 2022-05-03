import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableLabelsAndTaskLabel1648887975409
  implements MigrationInterface
{
  name = 'AlterTableLabelsAndTaskLabel1648887975409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`label\`
            ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
    await queryRunner.query(`
            ALTER TABLE \`label\`
            ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        `);
    await queryRunner.query(`
            ALTER TABLE \`task_label\`
            ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
    await queryRunner.query(`
            ALTER TABLE \`task_label\`
            ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`task_label\` DROP COLUMN \`updated_at\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`task_label\` DROP COLUMN \`created_at\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`label\` DROP COLUMN \`updated_at\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`label\` DROP COLUMN \`created_at\`
        `);
  }
}
