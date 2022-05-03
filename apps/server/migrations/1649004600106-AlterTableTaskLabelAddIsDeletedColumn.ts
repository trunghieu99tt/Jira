import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTaskLabelAddIsDeletedColumn1649004600106
  implements MigrationInterface
{
  name = 'AlterTableTaskLabelAddIsDeletedColumn1649004600106';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`task_label\`
            ADD \`is_deleted\` tinyint NOT NULL DEFAULT 0
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`task_label\` DROP COLUMN \`is_deleted\`
        `);
  }
}
